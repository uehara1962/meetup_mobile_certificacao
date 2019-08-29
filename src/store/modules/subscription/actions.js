export function createSubscriptionRequest(data) {
  return {
    type: '@subscription/CREATE_SUBSCRIPTION_REQUEST',
    payload: { data },
  };
}

export function createSubscriptionSuccess(subscription) {
  return {
    type: '@subscription/CREATE_SUBSCRIPTION_SUCCESS',
    payload: { subscription },
  };
}

export function createSubscriptionFailure() {
  return {
    type: '@subscription/CREATE_SUBSCRIPTION_FAILURE',
  };
}

export function cancelSubscriptionRequest(data) {
  return {
    type: '@subscription/CANCEL_SUBSCRIPTION_REQUEST',
    payload: { data },
  };
}

export function cancelSubscriptionSuccess(subscription) {
  return {
    type: '@subscription/CANCEL_SUBSCRIPTION_SUCCESS',
    payload: { subscription },
  };
}

export function cancelSubscriptionFailure() {
  return {
    type: '@subscription/CANCEL_SUBSCRIPTION_FAILURE',
  };
}
