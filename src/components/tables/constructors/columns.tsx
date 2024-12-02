"use client";
import type { ColumnDef } from "@tanstack/react-table";

export type ConstructorsPoints = {
  name: string;
  points: number;
  startingPosition: number;
};

export const columnsConstructors: ColumnDef<ConstructorsPoints>[] = [
  {
    id: "position",
    header: "POS",
    accessorKey: "startingPosition",
  },
  {
    accessorKey: "name",
    header: "TEAM",
  },
  {
    accessorKey: "points",
    header: "PTS",
    sortingFn: "basic",
  },
];
