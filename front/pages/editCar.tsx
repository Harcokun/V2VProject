import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContainer } from "../containers/containerProvider";
import Card from "../components/Card/Card";
import styles from "../styles/form.module.css";
import Button from "../components/Button/Button";
import CenterPopup from "../components/popup/CenterPopup";

const EditCarButtonStyle = {
  default: {
    background: "#4BC0BB",
    border: "#4BC0BB",
    text: "#ffffff",
  },
  disabled: {
    background: "rgba(82, 203, 198, 0.2)",
    border: "#4BC0BB",
    text: "#4BC0BB",
  },
};

const CancelButtonStyle = {
  default: {
    background: "rgba(228, 48, 48, 0.1)",
    border: "#E43030",
    text: "#E43030",
  },
};

const EditCar: NextPage = () => {
  const { authService, carService } = useContainer();
  const router = useRouter();
  const [values, setValues] = useState({
    model: "",
    MacId: "",
  });

  const [errors, setErrors] = useState({
    model: "",
    MacId: "",
  });

  const [showSuccessPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    console.log(values);
    console.log("errors: ", errors);
  }, [values]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    //error validation
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(values);

    /**Handle registration process */
    const { data, errorMsg } = await carService.editCar(values);
    console.log(data);
    if (errorMsg) {
      console.log(errorMsg);
      setErrors({
        ...errorMsg,
      });
    } else {
      setSuccessPopup(true);
    }
  };

  return (
    <div className="static">
      <h1 className="inline-block static font-bold text-xl my-4 ml-10">
        Car Management
      </h1>
      <div className="grid grid-rows-1 grid-cols-6 gap-4">
        <div className="col-start-1 col-end-6">
          <Card heading={"Edit Car Information"}>
            <form
              className="w-full flex flex-col items-center max-w-lg"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row w-full px-3 -mx-3 mt-6 ">
                <p className="mx-10 mt-1">Name</p>
                <input
                  className={
                    errors["model"]
                      ? `${styles.input} ${styles.inputError}`
                      : `${styles.input} `
                  }
                  id="grid-model"
                  name="model"
                  type="model"
                  placeholder="Car Model"
                  value={values.model}
                  onChange={onChange}
                />
                <p className="text-alert mt-1">{errors.model}</p>
              </div>
              <div className="flex flex-row w-full px-3 -mx-3 my-6 ">
                <p className="ml-10 mr-12 mt-1">MAC</p>
                <input
                  className={
                    errors["MacId"]
                      ? `${styles.input} ${styles.inputError}`
                      : `${styles.input} `
                  }
                  id="grid-MacId"
                  name="MacId"
                  type="MacId"
                  placeholder="MAC Address"
                  value={values.MacId}
                  onChange={onChange}
                />
                <p className="text-alert mt-1">{errors.MacId}</p>
              </div>
              <div className="flex flex-row gap-12">
                <Button
                  text="ADD CAR"
                  colorStyle={EditCarButtonStyle}
                  margin={[24, 0, 0, 0]}
                  disabled={values.model == "" || values.MacId == ""}
                />
                <Button
                  text="CANCEL"
                  colorStyle={CancelButtonStyle}
                  margin={[24, 0, 0, 0]}
                  onClick={() => {
                    router.push("car");
                  }}
                />
              </div>
            </form>
          </Card>
        </div>
      </div>
      {showSuccessPopup && (
        <CenterPopup
          heading="Success !"
          description="Edit car successfully"
          description2=""
          onClick={() => setSuccessPopup(false)}
        />
      )}
    </div>
  );
};

export default EditCar;
