import allman from "./circresp/allman";
import circ from "./circresp/circ";
import respiration from "./circresp/respiration";
import angiologia from "./dog/angiologia";
import digestorius from "./dog/digestorius";
import endocrina from "./dog/endocrina";
import feminin from "./dog/feminin";
import masculina from "./dog/masculina";
import nervosum from "./dog/nervosum";
import respiratorius from "./dog/respiratorius";
import sensuum from "./dog/sensuum";
import skeleton from "./dog/skeleton";
import urinaria from "./dog/urinaria";

export const sections = [
  {
    name: "Hundens PM",
    id: "dog",
    domains: [
      respiratorius,
      angiologia,
      digestorius,
      urinaria,
      masculina,
      feminin,
      endocrina,
      nervosum,
      sensuum,
      skeleton,
    ],
  },
  {
    name: "Circ/Resp",
    id: "circresp",
    domains: [allman, respiration, circ],
  },
];
