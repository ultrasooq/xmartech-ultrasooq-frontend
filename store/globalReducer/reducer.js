import { globalActionTypes } from "./action";

const initialState = {
  toggleLoginModal: false,
  toggleRegisterModal: false,
  toggleForgotPasswordModal: false,
  toggleCreateProgramModal: false,
  toggleCreateTeamModal: false,
  toggleTermsModal: false,
  toggleAcceptModal: false,
  toggleRemoveEventModal: false,
  editEventData: null,
  toggleImagePreviewModal: false,
  toggleRemoveEventElementConfirmation: false,
  toggleCertificateModal: false,
  toggleGamerScoreModal: false,
  toggleAddMeasureModal: false,
  toggleSocialMediaModal: false,
  toggleShowMessageModal: false,
  toggleTeamMemberModal: false,
  toggleRegistrationFormModal: false,
  checkProgramAddedOrNot: false,
  checkTeamAddedOrNot: false,
  toggleUpdateEmailModal: false,
  toggleUpdatePasswordModal: false,
  toggleUpdatePhoneModal: false,
  toggleUpdateEmailPhoneVerifyModal: false,
  toggleMediaModal: false,
  toggleEmbeddedGameScheduleModal: false,
  toggleSelectedMediaModal: false,
  toggleSendMessage: false,
  toggleForActiveInactiveAthlete: false,
  toggleForMessageReply: false,
  toggleMessageDetails: false,
  toggleCoachProfileModal: false,
  toggleInvitationAfterRegistrationModal: false,
  toggleSeeMoreCoachDetailsModal: false,
  toggleShowMassUploadModal: false,
  toggleHeaderSearch: false,
  toggleJoinLeague: false,
  toggleAddGameLink: false,
  toggleWatchGameLink: false,
  toggleEmbeddedLiveGameListModal: false,
  toggleGameViewDescriptionModal: false,
  toggleMassUploadGameModal: false,
  toggleMassUploadTournamentModal: false,
  toggleMassUploadGameFromTournamentModal: false,
  toggleAddRegistrationFormModal: false,
  toggleAssignedRegistrationFormModal: false,
  toggleSubscribeFormModal: false,
  toggleMoreRegistrationFormModal: false,
  toggleMoreSubscriberFormModal: false,
  toggleUserListMoreRegistrationFormModal: false,
  toggleDiscountCouponModal: false,
  toggleAddNewFacilityModal: false,
  toggleRoleSelectionModal: false,
  toggleSocialMediaForEntityModal: false,
  toggleUpgradePopupModal: false,
  toggleSubscriptionCancel: false,
  toggleContactUsModal: false,
  toggleSharePostModal: false,
  toggleEmbeddedTeamRosterModal: false,
  toggleSeasonAddEditModal: false,
  toggleSeasonAssignModal: false,
  toggleCheckTeamFromProgramForSeasonAssignModal: false,
  toggleTimelineAreaModal: false,
  toggleSeasonAssignToEventModal: false,
  toggleEmbeddedStandingModal: false,
  toggleFigurePayAccountUpdateModal: false,
  toggleEmbeddedScheduleModal: false,
  toggleMassUploadCampClinicModal: false,
  toggleMassUploadUserForCampClinicModal: false,
  toggleAddBankAccountModal: false,
  toggleAssignEntityModal: false,
  toggleDepositModal: false,
  toggleAddPeopleModal: false,
  toggleAssignSubscriptionModal: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case globalActionTypes.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        toggleLoginModal: !state.toggleLoginModal,
      };
    case globalActionTypes.TOGGLE_REGISTER_MODAL:
      return {
        ...state,
        toggleRegisterModal: !state.toggleRegisterModal,
      };
    case globalActionTypes.TOGGLE_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        toggleForgotPasswordModal: !state.toggleForgotPasswordModal,
      };
    case globalActionTypes.TOGGLE_CREATE_PROGRAM_MODAL:
      return {
        ...state,
        toggleCreateProgramModal: !state.toggleCreateProgramModal,
      };
    case globalActionTypes.TOGGLE_CREATE_TEAM_MODAL:
      return {
        ...state,
        toggleCreateTeamModal: !state.toggleCreateTeamModal,
      };
    case globalActionTypes.TOGGLE_TERMS_MODAL:
      return {
        ...state,
        toggleTermsModal: !state.toggleTermsModal,
      };
    case globalActionTypes.TOGGLE_ACCEPT_MODAL:
      return {
        ...state,
        toggleAcceptModal: !state.toggleAcceptModal,
      };
    case globalActionTypes.REMOVE_EVENT_MODAL:
      return {
        ...state,
        toggleRemoveEventModal: !state.toggleRemoveEventModal,
      };
    case globalActionTypes.TOGGLE_IMAGE_PREVIEW_MODAL:
      return {
        ...state,
        toggleImagePreviewModal: !state.toggleImagePreviewModal,
      };
    case globalActionTypes.REMOVE_EVENT_ELEMENT_CONFIRMATION:
      return {
        ...state,
        toggleRemoveEventElementConfirmation:
          !state.toggleRemoveEventElementConfirmation,
      };
    case globalActionTypes.TOGGLE_CERTIFICATE_MODAL:
      return {
        ...state,
        toggleCertificateModal: !state.toggleCertificateModal,
      };
    case globalActionTypes.GAMER_SCORE_MODAL:
      return {
        ...state,
        toggleGamerScoreModal: !state.toggleGamerScoreModal,
      };
    case globalActionTypes.ADD_MEASURE_MODAL:
      return {
        ...state,
        toggleAddMeasureModal: !state.toggleAddMeasureModal,
      };
    case globalActionTypes.SOCIAL_MEDIA_MODAL:
      return {
        ...state,
        toggleSocialMediaModal: !state.toggleSocialMediaModal,
      };
    case globalActionTypes.SHOW_MESSAGE_MODAL:
      return {
        ...state,
        toggleShowMessageModal: !state.toggleShowMessageModal,
      };
    case globalActionTypes.TEAM_MEMBER_MODAL:
      return {
        ...state,
        toggleTeamMemberModal: !state.toggleTeamMemberModal,
      };
    case globalActionTypes.REGISTRATION_FORM_MODAL:
      return {
        ...state,
        toggleRegistrationFormModal: !state.toggleRegistrationFormModal,
      };
    case globalActionTypes.CHECK_PROGRAM_ADDED_OR_NOT:
      return {
        ...state,
        checkProgramAddedOrNot: !state.checkProgramAddedOrNot,
      };
    case globalActionTypes.CHECK_TEAM_ADDED_OR_NOT:
      return {
        ...state,
        checkTeamAddedOrNot: !state.checkTeamAddedOrNot,
      };
    case globalActionTypes.TOGGLE_UPDATE_EMAIL_MODAL:
      return {
        ...state,
        toggleUpdateEmailModal: !state.toggleUpdateEmailModal,
      };
    case globalActionTypes.TOGGLE_UPDATE_PASSWORD_MODAL:
      return {
        ...state,
        toggleUpdatePasswordModal: !state.toggleUpdatePasswordModal,
      };
    case globalActionTypes.TOGGLE_UPDATE_PHONE_MODAL:
      return {
        ...state,
        toggleUpdatePhoneModal: !state.toggleUpdatePhoneModal,
      };
    case globalActionTypes.TOGGLE_UPDATE_EMAIL_PHONE_VERIFY_MODAL:
      return {
        ...state,
        toggleUpdateEmailPhoneVerifyModal:
          !state.toggleUpdateEmailPhoneVerifyModal,
      };

    case globalActionTypes.TOGGLE_EMBEDDED_GAME_SCHEDULE_MODAL:
      return {
        ...state,
        toggleEmbeddedGameScheduleModal: !state.toggleEmbeddedGameScheduleModal,
      };
    case globalActionTypes.EDIT_LIST_EVENT_DATA: {
      return {
        ...state,
        editEventData: action.payload,
      };
    }
    case globalActionTypes.TOGGLE_MEDIA_MODAL: {
      return {
        ...state,
        toggleMediaModal: !state.toggleMediaModal,
      };
    }
    case globalActionTypes.TOGGLE_SELECTED_MEDIA_MODAL: {
      return {
        ...state,
        toggleSelectedMediaModal: !state.toggleSelectedMediaModal,
      };
    }
    case globalActionTypes.TOGGLE_SEND_MESSAGE: {
      return {
        ...state,
        toggleSendMessage: !state.toggleSendMessage,
      };
    }
    case globalActionTypes.TOGGLE_FOR_ACTIVE_INACTIVE_ATHLETE: {
      return {
        ...state,
        toggleForActiveInactiveAthlete: !state.toggleForActiveInactiveAthlete,
      };
    }
    case globalActionTypes.TOGGLE_FOR_MESSAGE_REPLY: {
      return {
        ...state,
        toggleForMessageReply: !state.toggleForMessageReply,
      };
    }
    case globalActionTypes.TOGGLE_MESSAGE_DETAILS: {
      return {
        ...state,
        toggleMessageDetails: !state.toggleMessageDetails,
      };
    }
    case globalActionTypes.TOGGLE_COACH_PROFILE: {
      return {
        ...state,
        toggleCoachProfileModal: !state.toggleCoachProfileModal,
      };
    }
    case globalActionTypes.TOGGLE_INVITATION_AFTER_REGISTRATION: {
      return {
        ...state,
        toggleInvitationAfterRegistrationModal:
          !state.toggleInvitationAfterRegistrationModal,
      };
    }
    case globalActionTypes.TOGGLE_SEEMORE_FOR_COACH_DETAILS: {
      return {
        ...state,
        toggleSeeMoreCoachDetailsModal: !state.toggleSeeMoreCoachDetailsModal,
      };
    }
    case globalActionTypes.TOGGLE_SHOW_MASS_UPLOAD_DATA: {
      return {
        ...state,
        toggleShowMassUploadModal: !state.toggleShowMassUploadModal,
      };
    }
    case globalActionTypes.TOGGLE_HEADER_SEARCH_MODAL: {
      return {
        ...state,
        toggleHeaderSearch: !state.toggleHeaderSearch,
      };
    }
    case globalActionTypes.TOGGLE_JOIN_LEAGUE: {
      return {
        ...state,
        toggleJoinLeague: !state.toggleJoinLeague,
      };
    }
    case globalActionTypes.TOGGLE_ADD_GAME_LINK: {
      return {
        ...state,
        toggleAddGameLink: !state.toggleAddGameLink,
      };
    }
    case globalActionTypes.TOGGLE_WATCH_GAME: {
      return {
        ...state,
        toggleWatchGameLink: !state.toggleWatchGameLink,
      };
    }
    case globalActionTypes.TOGGLE_EMBEDDED_LIVE_GAME_LIST_MODAL: {
      return {
        ...state,
        toggleEmbeddedLiveGameListModal: !state.toggleEmbeddedLiveGameListModal,
      };
    }
    case globalActionTypes.TOGGLE_VIEW_DESCRIPTION_GAME_MODAL: {
      return {
        ...state,
        toggleGameViewDescriptionModal: !state.toggleGameViewDescriptionModal,
      };
    }
    case globalActionTypes.TOGGLE_MASS_UPLOAD_GAME_MODAL: {
      return {
        ...state,
        toggleMassUploadGameModal: !state.toggleMassUploadGameModal,
      };
    }
    case globalActionTypes.TOGGLE_MASS_UPLOAD_TOURNAMENT_MODAL: {
      return {
        ...state,
        toggleMassUploadTournamentModal: !state.toggleMassUploadTournamentModal,
      };
    }
    case globalActionTypes.TOGGLE_MASS_UPLOAD_GAME_FROM_TOURNAMENT_MODAL: {
      return {
        ...state,
        toggleMassUploadGameFromTournamentModal:
          !state.toggleMassUploadGameFromTournamentModal,
      };
    }

    case globalActionTypes.TOGGLE_ADD_REGISTRATION_FORM_MODAL: {
      return {
        ...state,
        toggleAddRegistrationFormModal: !state.toggleAddRegistrationFormModal,
      };
    }
    case globalActionTypes.TOGGLE_FORM_ASSIGNED_MODAL: {
      return {
        ...state,
        toggleAssignedRegistrationFormModal:
          !state.toggleAssignedRegistrationFormModal,
      };
    }
    case globalActionTypes.TOGGLE_FORM_SUBSCRIBE_MODAL: {
      return {
        ...state,
        toggleSubscribeFormModal: !state.toggleSubscribeFormModal,
      };
    }
    case globalActionTypes.TOGGLE_MORE_REGISTRATION_FORM_MODAL: {
      return {
        ...state,
        toggleMoreRegistrationFormModal: !state.toggleMoreRegistrationFormModal,
      };
    }
    case globalActionTypes.TOGGLE_MORE_SUBSCRIBER_FORM_MODAL: {
      return {
        ...state,
        toggleMoreSubscriberFormModal: !state.toggleMoreSubscriberFormModal,
      };
    }
    case globalActionTypes.TOGGLE_MORE_USER_LIST_REGISTRATION_FORM_MODAL: {
      return {
        ...state,
        toggleUserListMoreRegistrationFormModal:
          !state.toggleUserListMoreRegistrationFormModal,
      };
    }
    case globalActionTypes.TOGGLE_DISCOUNT_COUPON_MODAL: {
      return {
        ...state,
        toggleDiscountCouponModal: !state.toggleDiscountCouponModal,
      };
    }
    case globalActionTypes.TOGGLE_ADD_NEW_FACILITY_MODAL: {
      return {
        ...state,
        toggleAddNewFacilityModal: !state.toggleAddNewFacilityModal,
      };
    }
    case globalActionTypes.TOGGLE_ROLE_SELECTION_MODAL: {
      return {
        ...state,
        toggleRoleSelectionModal: !state.toggleRoleSelectionModal,
      };
    }
    case globalActionTypes.TOGGLE_SOCIAL_MEDIA_FOR_ENTITY_MODAL: {
      return {
        ...state,
        toggleSocialMediaForEntityModal: !state.toggleSocialMediaForEntityModal,
      };
    }
    case globalActionTypes.TOGGLE_UPGRADE_POPUP_MODAL: {
      return {
        ...state,
        toggleUpgradePopupModal: !state.toggleUpgradePopupModal,
      };
    }
    case globalActionTypes.TOGGLE_SUBSCRIPTION_CANCEL_MODAL: {
      return {
        ...state,
        toggleSubscriptionCancel: !state.toggleSubscriptionCancel,
      };
    }
    case globalActionTypes.TOGGLE_CONTACT_US_MODAL: {
      return {
        ...state,
        toggleContactUsModal: !state.toggleContactUsModal,
      };
    }
    case globalActionTypes.TOGGLE_SHARE_POST_MODAL: {
      return {
        ...state,
        toggleSharePostModal: !state.toggleSharePostModal,
      };
    }
    case globalActionTypes.TOGGLE_EMBEDDED_TEAM_ROSTER_MODAL: {
      return {
        ...state,
        toggleEmbeddedTeamRosterModal: !state.toggleEmbeddedTeamRosterModal,
      };
    }
    case globalActionTypes.TOGGLE_SEASON_ADD_EDIT_MODAL: {
      return {
        ...state,
        toggleSeasonAddEditModal: !state.toggleSeasonAddEditModal,
      };
    }
    case globalActionTypes.TOGGLE_SEASON_ASSIGN_MODAL: {
      return {
        ...state,
        toggleSeasonAssignModal: !state.toggleSeasonAssignModal,
      };
    }
    case globalActionTypes.TOGGLE_CHECK_TEAMS_FROM_CLUB_SEASON_ASSIGN_MODAL: {
      return {
        ...state,
        toggleCheckTeamFromProgramForSeasonAssignModal:
          !state.toggleCheckTeamFromProgramForSeasonAssignModal,
      };
    }
    case globalActionTypes.TOGGLE_EMBEDDED_TIMELINE_AREA_MODAL: {
      return {
        ...state,
        toggleTimelineAreaModal: !state.toggleTimelineAreaModal,
      };
    }
    case globalActionTypes.TOGGLE_ASSIGN_SEASON_TO_EVENT_MODAL: {
      return {
        ...state,
        toggleSeasonAssignToEventModal: !state.toggleSeasonAssignToEventModal,
      };
    }
    case globalActionTypes.TOGGLE_EMBEDDED_STANDING_MODAL: {
      return {
        ...state,
        toggleEmbeddedStandingModal: !state.toggleEmbeddedStandingModal,
      };
    }
    case globalActionTypes.TOGGLE_FIGURE_PAY_ACCOUNT_UPDATE_MODAL: {
      return {
        ...state,
        toggleFigurePayAccountUpdateModal:
          !state.toggleFigurePayAccountUpdateModal,
      };
    }
    case globalActionTypes.TOGGLE_EMBEDDED_SCHEDULE_MODAL: {
      return {
        ...state,
        toggleEmbeddedScheduleModal: !state.toggleEmbeddedScheduleModal,
      };
    }
    case globalActionTypes.TOGGLE_MASS_UPLOAD_CAMP_CLINIC_MODAL: {
      return {
        ...state,
        toggleMassUploadCampClinicModal: !state.toggleMassUploadCampClinicModal,
      };
    }
    case globalActionTypes.TOGGLE_MASS_UPLOAD_USER_FOR_CAMP_CLINIC_MODAL: {
      return {
        ...state,
        toggleMassUploadUserForCampClinicModal:
          !state.toggleMassUploadUserForCampClinicModal,
      };
    }
    case globalActionTypes.TOGGLE_ADD_BANK_ACCOUNT_MODAL: {
      return {
        ...state,
        toggleAddBankAccountModal: !state.toggleAddBankAccountModal,
      };
    }
    case globalActionTypes.TOGGLE_ASSIGN_ENTITY_MODAL: {
      return {
        ...state,
        toggleAssignEntityModal: !state.toggleAssignEntityModal,
      };
    }
    case globalActionTypes.TOGGLE_DEPOSIT_MODAL: {
      return {
        ...state,
        toggleDepositModal: !state.toggleDepositModal,
      };
    }
    case globalActionTypes.TOGGLE_ADDPEOPLE_MODAL: {
      return {
        ...state,
        toggleAddPeopleModal: !state.toggleAddPeopleModal,
      };
    }
    case globalActionTypes.TOGGLE_SUBSCRIPTION_ASSIGN_MODAL: {
      return {
        ...state,
        toggleAssignSubscriptionModal: !state.toggleAssignSubscriptionModal,
      };
    }
    default:
      return state;
  }
}
