# Young Carers Austria CMS

## Package Manager

This project `pnpm` for managing the dependencies.

## Ideas

- [ ] adapt the serverURL for production use
- [ ] set admin.meta accordingly
- [ ] take a look at `admin.indexHTML.portal`
- [ ] set admin.dateFormat
- [ ] take a look at `admin.components`
- [ ] set `graphql.disable`, because we don't utilize graphql
- [ ] set `indexSortableFields`
- [ ] after our SMTP server is set up, take a look at `email` to send broken links update infos
- [ ] deeply look into hooks for markdown and github notifications
- [ ] take a look into plugins and what might be improved by utilizing those
- [ ] look into `endpoints` and the Local API for management tasks (data import, link checker, seeding, opengraph, ...)
- [ ] [Use environment variables in the config](https://payloadcms.com/docs/configuration/overview#using-environment-variables-in-your-config)


    {
      name: 'color', // required
      type: 'radio', // required
      options: [ // required
        {
          label: '🌐 (website)',
          value: 'web',
        },
        {
          label: '📧 (email)',
          value: 'email',
        },
        {
          label: '☎️ (telephone)',
          value: 'phone',
        },
      ],
      defaultValue: 'option_1',
      admin: {
        layout: 'horizontal',
      }
    }
