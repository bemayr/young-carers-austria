import { ListMeta } from '@keystone-6/core/types';
export function localizedViaDescription(list: ListMeta){
    return list.description || list.label
}
