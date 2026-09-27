// Client
import { IsMeasuredHost } from "@/lib/client/analytics";

describe("IsMeasuredHost", () => {
  it("measures the live site", () => {
    expect(IsMeasuredHost("meteorology.sh")).toBe(true);
  });

  it("measures the www host", () => {
    expect(IsMeasuredHost("www.meteorology.sh")).toBe(true);
  });

  it("skips the Vite dev server", () => {
    expect(IsMeasuredHost("localhost")).toBe(false);
  });

  it("skips the loopback address", () => {
    expect(IsMeasuredHost("127.0.0.1")).toBe(false);
  });

  it("skips the nginx container on the local network", () => {
    expect(IsMeasuredHost("0.0.0.0")).toBe(false);
  });

  it("skips a host that ends with the live domain", () => {
    expect(IsMeasuredHost("staging.meteorology.sh.example.com")).toBe(false);
  });
});
