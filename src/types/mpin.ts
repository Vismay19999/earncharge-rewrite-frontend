export interface MpinResponse {
    success: boolean;
    message: string;
  }
  
  export interface MpinValidateRequest {
    phoneNumber: string;
    mpin: string;
  }
  
  export interface MpinResetRequest {
    oldMpin: string;
    newMpin: string;
  }
  
  export interface MpinSetRequest {
    pin: string;
  }
  