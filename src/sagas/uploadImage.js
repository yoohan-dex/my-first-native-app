import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { REGISTER_ERROR, REGISTER_FULLFILL, MOBILE_REGISTER } from '../actions/register';
import { saveUser } from '../actions/user';
import { setUser } from '../actions/global';
