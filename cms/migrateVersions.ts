const payload = require("payload");

require("dotenv").config();

const { PAYLOAD_SECRET, MONGODB_URI } = process.env;

// This function ensures that there is at least one corresponding version for any document
// within each of your draft-enabled collections.

const ensureAtLeastOneVersion = async () => {
  // Initialize Payload
  // IMPORTANT: make sure your ENV variables are filled properly here
  // as the below variable names are just for reference.
  await payload.init({
    secret: PAYLOAD_SECRET,
    mongoURL: MONGODB_URI,
    local: true,
  });

  // For each collection
  await Promise.all(
    payload.config.collections.map(async ({ slug, versions }) => {
      // If drafts are enabled
      if (versions?.drafts) {
        const { docs } = await payload.find({
          collection: slug,
          limit: 0,
          depth: 0,
          locale: "all",
        });

        const VersionsModel = payload.versions[slug];
        const existingCollectionDocIds: Array<string> = [];
        await Promise.all(
          docs.map(async (doc) => {
            existingCollectionDocIds.push(doc.id);
            // Find at least one version for the doc
            const versionDocs = await VersionsModel.find(
              {
                parent: doc.id,
                updatedAt: { $gte: doc.updatedAt },
              },
              null,
              { limit: 1 }
            ).lean();

            // If there are no corresponding versions,
            // we need to create one
            if (versionDocs.length === 0) {
              try {
                await VersionsModel.create({
                  parent: doc.id,
                  version: doc,
                  autosave: Boolean(versions?.drafts?.autosave),
                  updatedAt: doc.updatedAt,
                  createdAt: doc.createdAt,
                });
              } catch (e) {
                console.error(
                  `Unable to create version corresponding with collection ${slug} document ID ${doc.id}`,
                  e?.errors || e
                );
              }

              console.log(
                `Created version corresponding with ${slug} document ID ${doc.id}`
              );
            }
          })
        );

        const versionsWithoutParentDocs = await VersionsModel.deleteMany({
          parent: { $nin: existingCollectionDocIds },
        });

        if (versionsWithoutParentDocs.deletedCount > 0) {
          console.log(
            `Removing ${versionsWithoutParentDocs.deletedCount} versions for ${slug} collection - parent documents no longer exist`
          );
        }
      }
    })
  );

  console.log("Done!");
  process.exit(0);
};

ensureAtLeastOneVersion();
