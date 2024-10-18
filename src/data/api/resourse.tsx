export const enum AllSourceUrl {
  HostDev = "https://api.coindesk.com",
  HostStg = "",
}

export const baseUrl = {
  value: AllSourceUrl.HostDev,
};

export const urls = {
  coins: "v1/bpi/currentprice.json",
};
