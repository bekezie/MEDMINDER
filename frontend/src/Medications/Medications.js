import MedicineCard from "./MedicationCard";
import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import NewMedicineForm from "./NewMedicineForm";
import { Redirect } from "react-router";
import "../Medications/Medications.css";

const Medications = function (props) {
  const [medicineArray, setMedicineArray] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // we generate all of the medication data when the component mounts
  useEffect(
    function () {
      const getMedications = async () => {
        if (props.user) {
          setIsDataLoading(true);
          const userMedicationsResults = await fetch(
            `/medicineData/${props.user._id}`
          );
          const userMedicationsParsed = await userMedicationsResults.json();
          setMedicineArray(userMedicationsParsed.medications);
          setIsDataLoading(false);
        }
      };
      getMedications();
    },
    [props.user]
  );

  // function that refreshes the medicine cards when they get deleted or updated
  const refreshMedicineCards = async () => {
    setIsDataLoading(true);
    const userMedicationsResults = await fetch(
      `/medicineData/${props.user._id}`
    );
    const userMedicationsParsed = await userMedicationsResults.json();
    setMedicineArray(userMedicationsParsed.medications);
    setIsDataLoading(false);
  };

  // we render this component if they're logged in, otherwise we send them to the login
  if (props.user && props.user._id) {
    return (
      <div className="medsContainer">
        <div className="container">
          <div class="meds"></div>
          <br />
          <br />
          <div className="row">
            <p className="h1-font" text-align="center">
              My Medications{" "}
            </p>
            <br />
          </div>

          <div className="card-group"></div>
          <NewMedicineForm
            user={props.user}
            refreshMedicineCards={refreshMedicineCards}
          />

          <br />
          <p className="h2-font" text-align="center">
            Current Medications{" "}
          </p>
          {isDataLoading ? (
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000}
            />
          ) : (
            <div className="container justify-content-center d-flex">
              <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-x1-2 w-100">
                {medicineArray.map((medicine) => {
                  return (
                    <MedicineCard
                      key={medicine._id}
                      medicine={medicine}
                      refreshMedicineCards={refreshMedicineCards}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <div className="container">
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Medications;
