import { useContext, useEffect, useState } from "react";
import MapContext from "./map.context";

const toCoordObj = (coordArr: [number, number]) => ({
  lng: coordArr[0],
  lat: coordArr[1],
});
const toMapCoords = (geojson: any) => geojson[0][0].map(toCoordObj);

const Polygon = ({ paths }: any) => {
  const [polygon, setPolygon] = useState<google.maps.Polygon>();

  const map = useContext(MapContext);

  polygon?.setMap(map);

  const defaultStyle = {
    strokeColor: "#3ea878",
    fillColor: "transparent",
  };
  const hoverStyle = {
    strokeColor: "#3ea878",
    fillColor: "#3ea878",
  };

  useEffect(() => {
    if (!polygon) {
      setPolygon(
        new google.maps.Polygon({
          paths,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillOpacity: 0.2,
          ...defaultStyle,
        })
      );
    } else {
      google.maps.event.addListener(polygon, "mouseover", () => {
        polygon.setOptions(hoverStyle);
      });
      google.maps.event.addListener(polygon, "mouseout", () => {
        polygon.setOptions(defaultStyle);
      });
    }
    return () => {
      if (polygon) {
        polygon.setMap(null);
      }
    };
  }, [polygon]);

  return null;
};
export default Polygon;
export { toCoordObj, toMapCoords };
