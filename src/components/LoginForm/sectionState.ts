const enum SectionState {
    LOADING = -1,
    LOGIN = 0,
    LOGIN_SELECT_METHOD = 1,
    LOGIN_CODE = 2,
    REGISTER_USERNAME = 3,
    REGISTER_DISPLAY_NAME = 4,
    REGISTER_PASSWORD = 5,
    REGISTER_CF_VALIDATE = 6,
    REGISTER_VALIDATE_EMAIL = 7,
    RESULT = 8
};

export default SectionState;
