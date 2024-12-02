"use client";
import type { ColumnDef } from "@tanstack/react-table";

export type DriversPoints = {
  name: string;
  nationality: string;
  team: string;
  totalPoints: number;
  startingPosition: number;
};

export const columnsDrivers: ColumnDef<DriversPoints>[] = [
  {
    id: "position",
    header: "POS",
    accessorKey: "startingPosition",
  },
  {
    accessorKey: "name",
    header: "DRIVER",
  },
  {
    accessorKey: "nationality",
    header: "NATIONALITY",
  },
  {
    accessorKey: "team",
    header: "CAR",
  },
  {
    accessorKey: "totalPoints",
    header: "PTS",
    sortingFn: "basic",
  },
];
