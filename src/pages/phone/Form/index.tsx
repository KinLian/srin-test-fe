import { Alert, Button, Col, Row } from "antd";
import { MainLayout } from "../../../components/layout";
import { useGet, useSend } from "../../../hooks";
import { urlPhone, urlSinglePhone } from "../../../const/apiUrl";
import { InputWithTitle } from "../../../components/content";
import Title from "antd/es/typography/Title";
import { useRef } from "react";
import type { PhoneType } from "../../../types";
import { useNavigate, useParams } from "react-router";

const inputTitles: string[] = [
  "Model",
  "Price",
  "Processor",
  "RAM",
  "Battery",
  "Display",
  "Camera",
  "Card",
  "OS",
];

function PhoneFormPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);

  const isEditPage = !!id;

  const { data } = useGet<PhoneType>(urlSinglePhone(id));
  const {
    call: addPhone,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd,
    isFailed: isFailedAdd,
  } = useSend(urlPhone, "POST");
  const {
    call: updatePhone,
    isLoading: isLoadingUpdate,
    isSuccess: isSuccessUpdate,
    isFailed: isFailedUpdate,
  } = useSend(urlSinglePhone(id ?? ""), "PUT");

  function sendData() {
    if (formRef && formRef.current) {
      const formData = new FormData(formRef.current);
      const json: { [key: string]: FormDataEntryValue } = {};

      for (const [key, val] of formData.entries()) {
        json[key] = val;
      }

      if (isEditPage) updatePhone(json, { onSuccess });
      else addPhone(json, { onSuccess });
    }
  }

  function onSuccess() {
    setTimeout(() => {
      navigate("/phone");
    }, 3000);
  }

  const isLoading = isLoadingAdd || isLoadingUpdate;
  const isSuccess = isSuccessAdd || isSuccessUpdate;
  const isFailed = isFailedAdd || isFailedUpdate;

  const isDataAvailable = Boolean((isEditPage && data) || !isEditPage);

  const status = () => {
    if (isLoading) return <Alert type="info" message="Loading" />;
    else if (isSuccess) return <Alert type="success" message="Success" />;
    else if (isFailed) return <Alert type="error" message="Failed" />;
    else return <Alert type="info" message="Not yet to be send" />;
  };

  return (
    <MainLayout gap="1rem" isLoading={isDataAvailable}>
      {isDataAvailable && (
        <>
          <Title style={{ textAlign: "center" }}>
            {isEditPage ? "Edit" : "Add"} Phone
          </Title>
          {status()}
          <form ref={formRef}>
            <Row gutter={[24, 24]}>
              {inputTitles.map((it: string) => (
                <Col span={12}>
                  <InputWithTitle
                    title={it}
                    type="text"
                    name={it.toLowerCase()}
                    defaultValue={data?.[it.toLowerCase() as keyof PhoneType]}
                  />
                </Col>
              ))}
            </Row>
            <Button
              loading={isLoading}
              style={{ marginTop: "2rem" }}
              onClick={sendData}
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </MainLayout>
  );
}

export default PhoneFormPage;
