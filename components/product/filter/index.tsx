import { SortFilterItem } from "lib/constants";
import FilterItemDropdown from "./dropdown";

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

export default function FilterList({ list }: { list: ListItem[] }) {
  return (
    <>
      <nav className="filter-list">
        <ul className="">
          <FilterItemDropdown list={list} />
        </ul>
      </nav>
    </>
  );
}
