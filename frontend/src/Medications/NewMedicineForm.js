import { useState, useRef } from "react";
import { toast } from "react-toastify";
import "../Medications/Medications.css";

const NewMedicineForm = (props) => {
  // variable that holds a reference to the html form element
  const medicationForm = useRef(null);

  // dosage input controllers
  const [dosageValue, setDosageValue] = useState(
    props.dosage ? props.dosage : ""
  );
  const handleDosageChange = (event) => {
    setDosageValue(event.target.value);
  };

  //medication name controllers
  const [medicationNameValue, setMedicationName] = useState(
    props.medicationName ? props.medicationName : ""
  );

  const handleMedicationNameChange = (event) => {
    setMedicationName(event.target.value);
  };

  //days needed controller
  const [daysNeededObject, setDaysNeededObject] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  });

  // time needed controller
  const [timesNeededObject, setTimesNeededObject] = useState({
    0: true,
    1: true,
    2: true,
  });

  const newMedicineSubmitted = async (event) => {
    event.preventDefault();
    const result = await fetch("/medicineData/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medicineName: medicationNameValue,
        medicineDosage: dosageValue,
        patientId: props.user._id,
        takenStatusObject: {
          0: { 0: false, 1: false, 2: false },
          1: { 0: false, 1: false, 2: false },
          2: { 0: false, 1: false, 2: false },
          3: { 0: false, 1: false, 2: false },
          4: { 0: false, 1: false, 2: false },
          5: { 0: false, 1: false, 2: false },
          6: { 0: false, 1: false, 2: false },
        },
        daysNeeded: daysNeededObject,
        timesNeeded: timesNeededObject,
      }),
    });
    const postResult = await result.json();
    if (postResult.successful) {
      props.refreshMedicineCards();
      setMedicationName("");
      setDosageValue("");
    } else {
      toast.error("Couldn't add medicine. Please try again.");
    }
  };
  return (
    <div className="container">
      <div className="row" id="row-size">
        <div className="col-7" id="center">
          <form
            className="form-inline"
            ref={medicationForm}
            onSubmit={newMedicineSubmitted}
          >
            <p className="h2-font" text-align="center">Add a new medication</p>
           
            <div>
              <div className="mb-1">
                <label className="form-label">Medication Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Medication Name"
                  value={medicationNameValue}
                  onChange={handleMedicationNameChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Dosage</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Dosage"
                  value={dosageValue}
                  onChange={handleDosageChange}
                />
              </div>
              <div className="mb-1">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={timesNeededObject[0]}
                    onChange={() => {
                      setTimesNeededObject({
                        ...timesNeededObject,
                        0: !timesNeededObject[0],
                      });
                    }}
                    type="checkbox"
                  />
                  <label className="form-check-label">Morning</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={timesNeededObject[1]}
                    onChange={() => {
                      setTimesNeededObject({
                        ...timesNeededObject,
                        1: !timesNeededObject[1],
                      });
                    }}
                    type="checkbox"
                  />
                  <label className="form-check-label">Afternoon</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={timesNeededObject[2]}
                    onChange={() => {
                      setTimesNeededObject({
                        ...timesNeededObject,
                        2: !timesNeededObject[2],
                      });
                    }}
                    type="checkbox"
                  />
                  <label className="form-check-label">Evening</label>
                </div>
              </div>
              <div className="mb-2" >
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={daysNeededObject[0]}
                    onChange={() => {
                      setDaysNeededObject({
                        ...daysNeededObject,
                        0: !daysNeededObject[0],
                      });
                    }}
                    type="checkbox"
                  />
                  <label className="form-check-label">Su</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={daysNeededObject[1]}
                    onChange={() => {
                      setDaysNeededObject({
                        ...daysNeededObject,
                        1: !daysNeededObject[1],
                      });
                    }}
                    type="checkbox"
                    value={true}
                  />
                  <label className="form-check-label">Mo</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={daysNeededObject[2]}
                    onChange={() => {
                      setDaysNeededObject({
                        ...daysNeededObject,
                        2: !daysNeededObject[2],
                      });
                    }}
                    type="checkbox"
                  />
                  <label className="form-check-label">Tu</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={daysNeededObject[3]}
                    onChange={() => {
                      setDaysNeededObject({
                        ...daysNeededObject,
                        3: !daysNeededObject[3],
                      });
                    }}
                    type="checkbox"
                  />
                  <label className="form-check-label">We</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={daysNeededObject[4]}
                    onChange={() => {
                      setDaysNeededObject({
                        ...daysNeededObject,
                        4: !daysNeededObject[4],
                      });
                    }}
                    type="checkbox"
                  />
                  <label className="form-check-label">Th</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={daysNeededObject[5]}
                    onChange={() => {
                      setDaysNeededObject({
                        ...daysNeededObject,
                        5: !daysNeededObject[5],
                      });
                    }}
                    type="checkbox"
                  />
                  <label className="form-check-label">Fr</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={daysNeededObject[6]}
                    onChange={() => {
                      setDaysNeededObject({
                        ...daysNeededObject,
                        6: !daysNeededObject[6],
                      });
                    }}
                    type="checkbox"
                  />
                  <label className="form-check-label">Sa</label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mb-3" id="button">
              Add Medication
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMedicineForm;
