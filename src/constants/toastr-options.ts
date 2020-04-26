import {AddToastPayload} from "react-redux-toastr";

export const toastrErrorOptions = (message: string): AddToastPayload =>  ({
  type: 'light',
  message,
  position: 'top-center',
  options: {icon: 'error'}
})
export const toastrSuccessOptions = (message: string): AddToastPayload =>  ({
  type: 'light',
  message,
  position: 'top-center',
  options: {icon: 'success'}
})
