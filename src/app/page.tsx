"use client";
import { useState, useEffect } from "react";

import {
  SiGithub,
  SiGithubHex,
  SiLinkedin,
  SiLinkedinHex,
  SiBluesky,
  SiBlueskyHex,
} from "@icons-pack/react-simple-icons";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConstructorsDataTable } from "@/components/tables/constructors/data-table";
import {
  type ConstructorsPoints,
  columnsConstructors,
} from "@/components/tables/constructors/columns";
import {
  type DriversPoints,
  columnsDrivers,
} from "@/components/tables/drivers/columns";
import { DriversDataTable } from "@/components/tables/drivers/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Drivers = {
  VER: DriversPoints;
  PER: DriversPoints;
  NOR: DriversPoints;
  LEC: DriversPoints;
  PIA: DriversPoints;
  SAI: DriversPoints;
};

export default function HomePage() {
  const [ConstructorsPoints, setConstructorsPoints] = useState<
    ConstructorsPoints[]
  >([]);
  const [Drivers, setDrivers] = useState({
    VER: {
      points: 429,
      pointsGained: 0,
      finishingPosition: null,
      fastestLap: false,
    },
    PER: {
      points: 152,
      pointsGained: 0,
      finishingPosition: null,
      fastestLap: false,
    },
    NOR: {
      points: 349,
      pointsGained: 0,
      finishingPosition: null,
      fastestLap: false,
    },
    LEC: {
      points: 341,
      pointsGained: 0,
      finishingPosition: null,
      fastestLap: false,
    },
    PIA: {
      points: 291,
      pointsGained: 0,
      finishingPosition: null,
      fastestLap: false,
    },
    SAI: {
      points: 272,
      pointsGained: 0,
      finishingPosition: null,
      fastestLap: false,
    },
  });
  const [DriversWithPoints, setDriversWithPoints] = useState<Drivers>({
    VER: {
      name: "Verstappen",
      nationality: "NED",
      team: "Red Bull Racing Honda RBPT",
      totalPoints: 0,
      startingPosition: 1,
    },
    PER: {
      name: "Perez",
      nationality: "MEX",
      team: "Red Bull Racing Honda RBPT",
      totalPoints: 0,
      startingPosition: 8,
    },
    NOR: {
      name: "Norris",
      nationality: "GBR",
      team: "McLaren Mercedes",
      totalPoints: 0,
      startingPosition: 2,
    },
    LEC: {
      name: "Leclerc",
      nationality: "MON",
      team: "Ferrari",
      totalPoints: 0,
      startingPosition: 3,
    },
    PIA: {
      name: "Piastri",
      nationality: "AUS",
      team: "McLaren Mercedes",
      totalPoints: 0,
      startingPosition: 4,
    },
    SAI: {
      name: "Sainz",
      nationality: "ESP",
      team: "Ferrari",
      totalPoints: 0,
      startingPosition: 5,
    },
  });
  const [DriversPoints, setDriversPoints] = useState<DriversPoints[]>([]);
  const [finishingPositions, setFinishingPositions] = useState([
    { position: "1st", points: 25, selected: false },
    { position: "2nd", points: 18, selected: false },
    { position: "3rd", points: 15, selected: false },
    { position: "4th", points: 12, selected: false },
    { position: "5th", points: 10, selected: false },
    { position: "6th", points: 8, selected: false },
    { position: "7th", points: 6, selected: false },
    { position: "8th", points: 4, selected: false },
    { position: "9th", points: 2, selected: false },
    { position: "10th", points: 1, selected: false },
    { position: "11th", points: 0, selected: false },
    { position: "12th", points: 0, selected: false },
    { position: "13th", points: 0, selected: false },
    { position: "14th", points: 0, selected: false },
    { position: "15th", points: 0, selected: false },
    { position: "16th", points: 0, selected: false },
    { position: "17th", points: 0, selected: false },
    { position: "18th", points: 0, selected: false },
    { position: "19th", points: 0, selected: false },
    { position: "20th", points: 0, selected: false },
  ]);
  const [fastestLapSet, setFastestLapSet] = useState<boolean>(false);

  function addPoints(driver: keyof typeof Drivers, position: string) {
    const driverObj = Drivers[driver];
    const pointsObj = finishingPositions.find(
      (posObj) => posObj.position === position,
    );
    if (!pointsObj) return;
    setFinishingPositions((prevPositions) =>
      prevPositions.map((posObj) => {
        if (posObj.position === position) {
          return { ...posObj, selected: true }; // disable the position selected
        }
        if (driverObj && posObj.position === driverObj.finishingPosition) {
          return { ...posObj, selected: false }; // enable the previous position selected
        }
        return posObj;
      }),
    );
    setDrivers((prevDrivers) => ({
      ...prevDrivers, // Keep all other drivers unchanged
      [driver]: {
        ...prevDrivers[driver], // Copy the existing properties of the specific driver
        pointsGained: pointsObj.points, // Update the points
        finishingPosition: position,
      },
    }));
  }

  function setFastestLap(driver: keyof typeof Drivers, fastestLap: boolean) {
    setDrivers((prevDrivers) => ({
      ...prevDrivers, // Keep all other drivers unchanged
      [driver]: {
        ...prevDrivers[driver], // Copy the existing properties of the specific driver
        fastestLap: fastestLap,
      },
    }));
    setFastestLapSet(fastestLap);
  }

  useEffect(() => {
    setDriversWithPoints({
      ...DriversWithPoints,
      VER: {
        ...DriversWithPoints.VER,
        totalPoints:
          Drivers.VER.pointsGained +
          Drivers.VER.points +
          (Drivers.VER.fastestLap && Drivers.VER.pointsGained > 0 ? 1 : 0),
      },
      PER: {
        ...DriversWithPoints.PER,
        totalPoints:
          Drivers.PER.pointsGained +
          Drivers.PER.points +
          (Drivers.PER.fastestLap && Drivers.PER.pointsGained > 0 ? 1 : 0),
      },
      NOR: {
        ...DriversWithPoints.NOR,
        totalPoints:
          Drivers.NOR.pointsGained +
          Drivers.NOR.points +
          (Drivers.NOR.fastestLap && Drivers.NOR.pointsGained > 0 ? 1 : 0),
      },
      LEC: {
        ...DriversWithPoints.LEC,
        totalPoints:
          Drivers.LEC.pointsGained +
          Drivers.LEC.points +
          (Drivers.LEC.fastestLap && Drivers.LEC.pointsGained > 0 ? 1 : 0),
      },
      PIA: {
        ...DriversWithPoints.PIA,
        totalPoints:
          Drivers.PIA.pointsGained +
          Drivers.PIA.points +
          (Drivers.PIA.fastestLap && Drivers.PIA.pointsGained > 0 ? 1 : 0),
      },
      SAI: {
        ...DriversWithPoints.SAI,
        totalPoints:
          Drivers.SAI.pointsGained +
          Drivers.SAI.points +
          (Drivers.SAI.fastestLap && Drivers.SAI.pointsGained > 0 ? 1 : 0),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Drivers]); // disable eslint rule to stop infinite renders

  useEffect(() => {
    setDriversPoints([
      { ...DriversWithPoints.VER },
      { ...DriversWithPoints.NOR },
      { ...DriversWithPoints.LEC },
      { ...DriversWithPoints.PIA },
      { ...DriversWithPoints.SAI },
    ]);
    setConstructorsPoints([
      {
        name: "Ferrari",
        points:
          DriversWithPoints.LEC.totalPoints +
          DriversWithPoints.SAI.totalPoints +
          6,
        startingPosition: 2,
      }, //adding 6 due to ollie bearman getting them points
      {
        name: "McLaren Mercedes",
        points:
          DriversWithPoints.NOR.totalPoints + DriversWithPoints.PIA.totalPoints,
        startingPosition: 1,
      },
      {
        name: "Red Bull Racing Honda RBPT",
        points:
          DriversWithPoints.VER.totalPoints + DriversWithPoints.PER.totalPoints,
        startingPosition: 3,
      },
    ]);
  }, [DriversWithPoints]);

  return (
    <>
      <h1>Will Ferrari Win The Constructors Championship?</h1>
      <p>
        With one race to go, Ferrari can still win the Constructors
        Championship. There is a 21 point gap between them and McLaren.
        <br />
        But there is still a chance that Red Bull can steal second place from
        them if they fumble hard and Perez decides to turn up.
      </p>
      <p>
        Charles Leclerc still has a reasonable chance of securing second place
        in the Drivers Championship. The gap between him and Lando Norris is
        only 8 points.
        <br />
        Carlos Sainz can still mathematically secure fourth place in the Drivers
        Championship if he outscores Pisatri by 19 points.
      </p>
      <h3>
        Using the inputs below, find out if Ferrari can win their first
        Constructors Championship since 2008.
      </h3>
      <div className="flex w-full flex-wrap gap-4 sm:w-3/4 sm:flex-nowrap">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Constructors Championship</CardTitle>
          </CardHeader>
          <CardContent>
            <ConstructorsDataTable
              columns={columnsConstructors}
              data={ConstructorsPoints}
            />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Drivers Championship</CardTitle>
          </CardHeader>
          <CardContent>
            <DriversDataTable columns={columnsDrivers} data={DriversPoints} />
          </CardContent>
        </Card>
      </div>
      <div className="flex w-fit flex-wrap justify-center gap-4 sm:w-fit sm:flex-nowrap">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle>McLaren</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <table className="table-auto border-separate border-spacing-2">
              <tbody>
                <tr>
                  <td className="text-nowrap">Lando Norris</td>
                  <td>
                    <Select onValueChange={(value) => addPoints("NOR", value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Position" />
                      </SelectTrigger>
                      <SelectContent>
                        {finishingPositions.map((position) => (
                          <SelectItem
                            key={position.position}
                            value={position.position}
                            disabled={position.selected}
                          >
                            {position.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="flex flex-col items-center px-2">
                    <label htmlFor="nor-fl" className="text-nowrap">
                      Fastest Lap
                    </label>
                    <Checkbox
                      disabled={fastestLapSet && !Drivers.NOR.fastestLap}
                      onCheckedChange={(checked) =>
                        setFastestLap("NOR", !!checked)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-nowrap">Oscar Piastri</td>
                  <td>
                    <Select onValueChange={(value) => addPoints("PIA", value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Position" />
                      </SelectTrigger>
                      <SelectContent>
                        {finishingPositions.map((position) => (
                          <SelectItem
                            key={position.position}
                            value={position.position}
                            disabled={position.selected}
                          >
                            {position.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="flex flex-col items-center px-2">
                    <label htmlFor="pia-fl" className="text-nowrap">
                      Fastest Lap
                    </label>
                    <Checkbox
                      disabled={fastestLapSet && !Drivers.PIA.fastestLap}
                      onCheckedChange={(checked) =>
                        setFastestLap("PIA", !!checked)
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle>Ferrari</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <table className="table-auto border-separate border-spacing-2">
              <tbody>
                <tr>
                  <td className="text-nowrap">Charles Leclerc</td>
                  <td>
                    <Select onValueChange={(value) => addPoints("LEC", value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Position" />
                      </SelectTrigger>
                      <SelectContent>
                        {finishingPositions.map((position) => (
                          <SelectItem
                            key={position.position}
                            value={position.position}
                            disabled={position.selected}
                          >
                            {position.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="flex flex-col items-center px-2">
                    <label htmlFor="lec-fl" className="text-nowrap">
                      Fastest Lap
                    </label>
                    <Checkbox
                      disabled={fastestLapSet && !Drivers.LEC.fastestLap}
                      onCheckedChange={(checked) =>
                        setFastestLap("LEC", !!checked)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-nowrap">Carlos Sainz</td>
                  <td>
                    <Select onValueChange={(value) => addPoints("SAI", value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Position" />
                      </SelectTrigger>
                      <SelectContent>
                        {finishingPositions.map((position) => (
                          <SelectItem
                            key={position.position}
                            value={position.position}
                            disabled={position.selected}
                          >
                            {position.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="flex flex-col items-center px-2">
                    <label htmlFor="sai-fl" className="text-nowrap">
                      Fastest Lap
                    </label>
                    <Checkbox
                      disabled={fastestLapSet && !Drivers.SAI.fastestLap}
                      onCheckedChange={(checked) =>
                        setFastestLap("SAI", !!checked)
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle>Red Bull</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <table className="table-auto border-separate border-spacing-2">
              <tbody>
                <tr>
                  <td className="text-nowrap">Max Verstappen</td>
                  <td>
                    <Select onValueChange={(value) => addPoints("VER", value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Position" />
                      </SelectTrigger>
                      <SelectContent>
                        {finishingPositions.map((position) => (
                          <SelectItem
                            key={position.position}
                            value={position.position}
                            disabled={position.selected}
                          >
                            {position.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="flex flex-col items-center px-2">
                    <label htmlFor="ver-fl" className="text-nowrap">
                      Fastest Lap
                    </label>
                    <Checkbox
                      disabled={fastestLapSet && !Drivers.VER.fastestLap}
                      onCheckedChange={(checked) =>
                        setFastestLap("VER", !!checked)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-nowrap">Sergio Perez</td>
                  <td>
                    <Select onValueChange={(value) => addPoints("PER", value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Position" />
                      </SelectTrigger>
                      <SelectContent>
                        {finishingPositions.map((position) => (
                          <SelectItem
                            key={position.position}
                            value={position.position}
                            disabled={position.selected}
                          >
                            {position.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="flex flex-col items-center px-2">
                    <label htmlFor="per-fl" className="text-nowrap">
                      Fastest Lap
                    </label>
                    <Checkbox
                      disabled={fastestLapSet && !Drivers.PER.fastestLap}
                      onCheckedChange={(checked) =>
                        setFastestLap("PER", !!checked)
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
      <div>
        <Button variant={"ghost"} asChild className="h-7 w-7">
          <Link href="https://github.com/xhemals" target="_blank">
            <SiGithub color={SiGithubHex} />
          </Link>
        </Button>
        <Button variant={"ghost"} asChild className="h-7 w-7">
          <Link
            href="https://www.linkedin.com/in/jamie-speller/"
            target="_blank"
          >
            <SiLinkedin color={SiLinkedinHex} />
          </Link>
        </Button>
        <Button variant={"ghost"} asChild className="h-7 w-7">
          <Link href="https://bsky.app/profile/xhem.al" target="_blank">
            <SiBluesky color={SiBlueskyHex} />
          </Link>
        </Button>
      </div>
    </>
  );
}
