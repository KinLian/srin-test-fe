import { renderHook } from "@testing-library/react";
import { useGet } from "../../../hooks";
import type { PhoneType } from "../../../types";

// -------------------------- Variables --------------------------------
const mockFetch = jest.fn();

// -------------------------- Mocks ------------------------------------
global.fetch = mockFetch;

// ---------------------------- Datas -----------------------------------
const DUMMY_RESPONSE = { data: { id: "ID" } };
const RESULT_FETCH_SUCCESS = {
  ok: true,
  json: () => Promise.resolve(DUMMY_RESPONSE),
};
const RESULT_FETCH_FAILED = {
  ok: false,
};

describe("useGet", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should able to call API (success)", async () => {
    global.fetch = jest.fn().mockResolvedValue(RESULT_FETCH_SUCCESS);

    const { result } = renderHook(() => useGet<PhoneType>("phone"));
    const { refetch } = result.current;
    refetch();
  });

  it("should able to call API (failed)", async () => {
    global.fetch = jest.fn().mockResolvedValue(RESULT_FETCH_FAILED);

    const { result } = renderHook(() => useGet<PhoneType>("phone"));
    const { refetch } = result.current;
    refetch();
  });
});
