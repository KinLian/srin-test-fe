import { renderHook } from "@testing-library/react";
import { useSend } from "../../../hooks";

// -------------------------- Variables --------------------------------
const mockFetch = jest.fn();
const mockOnSuccess = jest.fn();
const mockOnFailed = jest.fn();

// -------------------------- Mocks ------------------------------------
global.fetch = mockFetch;

// ---------------------------- Datas -----------------------------------
const DUMMY_REQUEST_DATA = { id: "ID" };
const DUMMY_RESPONSE = { data: { id: "ID" } };
const RESULT_FETCH_SUCCESS = {
  ok: true,
  json: () => Promise.resolve(DUMMY_RESPONSE),
};
const RESULT_FETCH_FAILED = {
  ok: false,
};

describe("useSend", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should able to call API (success)", async () => {
    global.fetch = jest.fn().mockResolvedValue(RESULT_FETCH_SUCCESS);

    const { result } = renderHook(() => useSend("phone", "PUT"));
    const { call } = result.current;
    call(DUMMY_REQUEST_DATA, { onSuccess: mockOnSuccess, onFailed: mockOnFailed });
  });

  it("should able to call API (failed)", async () => {
    global.fetch = jest.fn().mockResolvedValue(RESULT_FETCH_FAILED);

    const { result } = renderHook(() => useSend("phone", "POST"));
    const { call } = result.current;
    call(DUMMY_REQUEST_DATA, { onSuccess: mockOnSuccess, onFailed: mockOnFailed });
    call(DUMMY_REQUEST_DATA, { onSuccess: mockOnSuccess });
  });
});
