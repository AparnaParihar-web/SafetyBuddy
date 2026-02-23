import React, { useEffect, useState } from "react";
import rescueIcon from "./assets/icons/rescue.png";

function Rescue() {
  const [loading, setLoading] = useState(true);

  const [hospitals, setHospitals] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        fetchNearbyPlaces(lat, lon);
      },
      (err) => {
        alert("Location permission denied!");
        console.log(err);
        setLoading(false);
      }
    );
  };

  const fetchNearbyPlaces = async (lat, lon) => {
    try {
      setLoading(true);

      // 🔥 BIG FIX: node + way + relation + bigger radius + more tags
      const query = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](around:12000,${lat},${lon});
        way["amenity"="hospital"](around:12000,${lat},${lon});
        relation["amenity"="hospital"](around:12000,${lat},${lon});

        node["amenity"="pharmacy"](around:12000,${lat},${lon});
        way["amenity"="pharmacy"](around:12000,${lat},${lon});
        relation["amenity"="pharmacy"](around:12000,${lat},${lon});

        node["shop"="pharmacy"](around:12000,${lat},${lon});
        way["shop"="pharmacy"](around:12000,${lat},${lon});
        relation["shop"="pharmacy"](around:12000,${lat},${lon});

        node["amenity"="police"](around:12000,${lat},${lon});
        way["amenity"="police"](around:12000,${lat},${lon});
        relation["amenity"="police"](around:12000,${lat},${lon});
      );
      out center;
      `;

      const url = "https://overpass-api.de/api/interpreter";

      const response = await fetch(url, {
        method: "POST",
        body: query,
      });

      const data = await response.json();

      const hospitalList = [];
      const pharmacyList = [];
      const policeList = [];

      data.elements.forEach((place) => {
        const tags = place.tags || {};
        const name = tags.name || "Unnamed Place";

        const address =
          tags["addr:full"] ||
          tags["addr:street"] ||
          tags["addr:city"] ||
          tags["addr:district"] ||
          tags["addr:state"] ||
          "Address not available";

        // FIX: way/relation uses "center"
        const placeLat = place.lat || place.center?.lat;
        const placeLon = place.lon || place.center?.lon;

        const item = {
          name,
          address,
          lat: placeLat,
          lon: placeLon,
        };

        if (tags.amenity === "hospital") hospitalList.push(item);

        if (tags.amenity === "pharmacy" || tags.shop === "pharmacy")
          pharmacyList.push(item);

        if (tags.amenity === "police") policeList.push(item);
      });

      // Remove duplicates by name
      const uniqueByName = (arr) =>
        arr.filter(
          (item, index, self) =>
            index === self.findIndex((x) => x.name === item.name)
        );

      setHospitals(uniqueByName(hospitalList));
      setPharmacies(uniqueByName(pharmacyList));
      setPoliceStations(uniqueByName(policeList));

      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      alert("Failed to fetch nearby places!");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const openMap = (lat, lon) => {
    window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={rescueIcon} alt="rescue" style={styles.icon} />
        <h1 style={styles.title}>Rescue Nearby</h1>
      </div>

      <p style={styles.subtitle}>
        Nearby Hospitals, Pharmacies & Police Stations 📍
      </p>

      {loading ? (
        <div style={styles.loaderBox}>
          <div style={styles.loader}></div>
          <p>Fetching nearby places...</p>
        </div>
      ) : (
        <>
          <Section
            title="🏥 Nearby Hospitals"
            data={hospitals}
            openMap={openMap}
          />

          <Section
            title="💊 Nearby Pharmacies"
            data={pharmacies}
            openMap={openMap}
          />

          <Section
            title="🚓 Nearby Police Stations"
            data={policeStations}
            openMap={openMap}
          />
        </>
      )}
    </div>
  );
}

function Section({ title, data, openMap }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>

      {data.length === 0 ? (
        <p style={styles.empty}>No places found nearby.</p>
      ) : (
        data.slice(0, 10).map((place, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.placeName}>{place.name}</h3>
            <p style={styles.placeAddress}>{place.address}</p>

            <button
              style={styles.mapBtn}
              onClick={() => openMap(place.lat, place.lon)}
            >
              📍 View on Map
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    padding: "25px",
    color: "white",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "10px",
    animation: "fadeIn 1s ease",
  },

  icon: {
    width: "55px",
    height: "55px",
  },

  title: {
    fontSize: "34px",
    fontWeight: "bold",
    color: "#38bdf8",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "16px",
    marginBottom: "30px",
    color: "#cbd5e1",
  },

  section: {
    marginBottom: "35px",
    animation: "slideUp 0.8s ease",
  },

  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#facc15",
  },

  empty: {
    color: "#cbd5e1",
    fontSize: "15px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "15px",
    borderRadius: "15px",
    marginBottom: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
    transition: "0.3s",
  },

  placeName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#38bdf8",
    marginBottom: "6px",
  },

  placeAddress: {
    fontSize: "14px",
    color: "#e2e8f0",
    marginBottom: "10px",
  },

  mapBtn: {
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#22c55e",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },

  loaderBox: {
    textAlign: "center",
    marginTop: "100px",
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(255,255,255,0.2)",
    borderTop: "5px solid #38bdf8",
    borderRadius: "50%",
    margin: "auto",
    animation: "spin 1s linear infinite",
  },
};

export default Rescue;