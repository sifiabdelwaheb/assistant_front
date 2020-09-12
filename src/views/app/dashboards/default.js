import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import NavBar from '../../../components/user/NavBar';
import { changeLocale } from '../../../redux/actions';
import { Navbar, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import loginForms from '../../../common/authUser';
import SimilarityForm from '../../../common/Similarity';
import Classes from './style.module.css';
import IntlMessages from '../../../helpers/IntlMessages';
import { getParameterByName, randomString } from '../../../helpers/Utils';

import { injectIntl } from 'react-intl';
import Card from '../../../components/user/Card';
import packageTwoImg from '../../../assets/images/package-two.jpeg';
import registerUserAction from '../../../redux/package/RegisterUserRedux';
import similarityAction from '../../../redux/similarity/ProductSimilarity';
import InputPattern from '../../../common/inputPattern';
import Hoc from '../../../hoc/wrapperInputs';

const Wrapper = Hoc(InputPattern);
function DefaultDashboard(props) {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const [loginErr, setLoginErr] = useState(false);
  const [clicked, setClick] = useState(false);
  const [isValid, setValidation] = useState(false);
  const [forms, setForm] = useState(loginForms());
  const [contactUsform, setContactForm] = useState(SimilarityForm().similarity);

  const redux = useSelector((state) => state);

  const onSendForm = (form) => {
    let data = {};
    for (let key in form) {
      data[key] = form[key].value;
    }
    return data;
  };
  let content = null;

  if (redux.auth.loaded) {
    content = <Redirect to="/app/dashboards/users" />;
  }

  const onContactUS = () => {
    setClick(true);
    if (isValid) {
      dispatch(similarityAction.SimilarityRequest(onSendForm(contactUsform)));
    }
  };
  return (
    <div className={Classes.Container}>
      <Card
        xs="12"
        sm="12"
        md="15"
        package={'Les produits le plus similaire à notre produit !'}
        withImgCard={false}
        Card={Classes.Card}
        Col={Classes.Col}
      >
        <Wrapper
          // onClick={() => console.log(onSendForm(contactUsform))}
          form={contactUsform}
          textButton="Connexion"
          loading={redux.RegisterUser.fetching}
          login={login}
          clicked={clicked}
          setClick={setClick}
          error={redux.RegisterUser.error}
          loaded={redux.RegisterUser.loaded}
          setContactForm={setContactForm}
          setValidation={setValidation}
          // errorMessage={redux.contactUs.response}
        />

        <Button onClick={() => onContactUS()} color="primary">
          <IntlMessages id="pages.predict" />
        </Button>

        {redux.ProductSimilarity.loaded ? (
          <p style={{ color: 'green' }}>
            {redux.ProductSimilarity.response.predict}
          </p>
        ) : (
          ''
        )}
      </Card>
    </div>
  );
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // pass in custom element to use
};

export default injectIntl(DefaultDashboard);
