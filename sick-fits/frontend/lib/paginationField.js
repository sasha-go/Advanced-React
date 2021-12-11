import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args;

      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        console.log(
          ` There are ${items.length} items in the cache! gonna send them to apollo`
        );
        return items;
      }
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      console.log(`Merging items from the network ${incoming.length}`);
      console.log(incoming);
      const merged = existing ? existing.slice(0) : [];

      merged.push(incoming);
      // eslint-disable-next-line no-plusplus
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      return merged;
    },
  };
}
