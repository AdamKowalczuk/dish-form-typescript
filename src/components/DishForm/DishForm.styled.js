import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 4px;
    min-width: 400px;
  }
  @media only screen and (max-width: 600px) {
    form {
      min-width: auto;
      width: 80%;
    }
  }
`;

const Header = styled.h2`
  color: rgb(81, 50, 192);
`;

const SubmitButton = styled.button`
  background-color: rgb(81, 50, 192);
  border-radius: 4px;
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: space-evenly;
  color: rgb(255, 255, 255);
  margin: 20px auto;
  cursor: pointer;
  border: 0;
  padding: 16.5px 14px;
  font-family: "Inter-Regular";
`;

export { FormWrapper, Header, SubmitButton };
