import { useState, useRef } from "react";
import { toast } from "react-toastify";
import "../Medications/Medications.css";

const MedicineCard = (props) => {
  //  these arrays are used for displaying which days and times are needed for a medication
  const dayArray = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const timeArray = ["Morning", "Afternoon", "Evening"];

  // these two useStates will hold the values of what is being selected on the forms
  const [daysNeededObject, setDaysNeededObject] = useState({
    0: props.medicine.daysNeeded[0],
    1: props.medicine.daysNeeded[1],
    2: props.medicine.daysNeeded[2],
    3: props.medicine.daysNeeded[3],
    4: props.medicine.daysNeeded[4],
    5: props.medicine.daysNeeded[5],
    6: props.medicine.daysNeeded[6],
  });
  const [timesNeededObject, setTimesNeededObject] = useState({
    0: props.medicine.timesNeeded[0],
    1: props.medicine.timesNeeded[1],
    2: props.medicine.timesNeeded[2],
  });

  //useState to display edit/delete form
  const [showEditForm, setShowEditForm] = useState(false);

  // variable that holds a reference to the html form element
  const medicationForm = useRef(null);

  // dosage input controllers
  const [dosageValue, setDosageValue] = useState(
    props.medicine.medicineDosage ? props.medicine.medicineDosage : ""
  );
  const handleDosageChange = (event) => {
    setDosageValue(event.target.value);
  };

  //medication name controllers
  const [medicationNameValue, setMedicationName] = useState(
    props.medicine.medicineName ? props.medicine.medicineName : ""
  );

  const handleMedicationNameChange = (event) => {
    setMedicationName(event.target.value);
  };

  // handle the edit of a medicine
  const editFormSubmitted = async (event) => {
    event.preventDefault();
    const result = await fetch("/medicineData/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.medicine._id,
        medicationName: medicationNameValue,
        medicationDosage: dosageValue,
        daysNeeded: daysNeededObject,
        timesNeeded: timesNeededObject,
      }),
    });
    const updateResult = await result.json();
    if (updateResult.updated) {
      toast.success("Updated Medicine Instance.");
      props.refreshMedicineCards();
    }
  };

  // handle a deletion of a medication
  const deleteMedicinePressed = async (event) => {
    event.preventDefault();
    const result = await fetch(`/medicineData/delete/${props.medicine._id}`, {
      method: "POST",
    });
    const deleteResult = await result.json();
    if (deleteResult.deleted) {
      toast.error("Deleted medicine");
      props.refreshMedicineCards();
    }
  };

  return (
    <div className="col">
      <div className="card mt-3 border border-dark">
        <div className="card-body">
          {!showEditForm && (
            <div>
              <h3 className="card-title">
                Name: {props.medicine.medicineName}
              </h3>
              <p className="card-text">
                Dosage: {props.medicine.medicineDosage}
              </p>
              <div className="card-text">
                <small className="text-muted">
                  <div className="row mb-3">
                    <h5 className="resize-card-heading">Times:</h5>
                    {Object.values(props.medicine.timesNeeded).map(
                      (time, index) => {
                        if (time) {
                          return (
                            <div key={index} className="col">
                              {timeArray[index]}
                            </div>
                          );
                        } else return null;
                      }
                    )}
                  </div>
                </small>
              </div>
              <div className="card-text">
                <small className="text-muted">
                  <div className="row mb-3">
                    <h5 className="resize-card-heading">Days:</h5>
                    {Object.values(props.medicine.daysNeeded).map(
                      (day, index) => {
                        if (day) {
                          return (
                            <div key={index} className="col">
                              {dayArray[index]}
                            </div>
                          );
                        } else return null;
                      }
                    )}
                  </div>
                </small>
              </div>
            </div>
          )}
          {!showEditForm && (
            <button
              className="btn btn-primary mb-3"
              id="button"
              onClick={() => {
                setShowEditForm(true);
              }}
            >
              Edit
            </button>
          )}
          {showEditForm && (
            <form ref={medicationForm} onSubmit={editFormSubmitted}>
              <div className="form-group mb-1">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Medication Name"
                  value={medicationNameValue}
                  onChange={handleMedicationNameChange}
                  required
                />
              </div>
              <div className="form-group mb-1">
                <label className="form-label">Dosage</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Dosage"
                  value={dosageValue}
                  onChange={handleDosageChange}
                  required
                />
              </div>
              <div className="mb-2">
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
              <div className="mb-2">
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
                    value={true}
                  />
                  <label className="form-check-label">Sa</label>
                </div>
              </div>
              <button className="btn btn-primary me-1" id="mb3" type="submit">
                Save Changes
              </button>
              <button
                className="btn btn-danger me-1"
                id="mb4"
                onClick={deleteMedicinePressed}
              >
                Delete Medication
              </button>
              <button
                className="btn btn-secondary me-1"
                id="mb5"
                onClick={() => {
                  setShowEditForm(false);
                }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
