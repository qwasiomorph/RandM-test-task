export const prepareQuery = (
  queryType: "character" | "location" | "episode",
  ...args: unknown[]
) => {
  let query = "";
  if (args.length < 1) {
    return query;
  }
  query += "?";
  if (typeof args[0] === "number") {
    let page = args[0];
    args = args.slice(1);
    query += `page=${page}&`;
  }
  switch (queryType) {
    case "character": {
      let [name, status, species, gender] = args;
      query += name ? `name=${name}&` : "";
      query += status ? `status=${status}&` : "";
      query += species ? `species=${species}&` : "";
      query += gender ? `gender=${gender}&` : "";
      break;
    }
    case "location": {
      let [name, type, dimension] = args;
      query += name ? `name=${name}&` : "";
      query += type ? `type=${type}&` : "";
      query += dimension ? `dimension=${dimension}&` : "";
      break;
    }
    case "episode": {
      let [name] = args;
      query += name ? `name=${name}&` : "";
    }
  }
  if (query.lastIndexOf("&") === query.length - 1) {
    query = query.slice(0, -1);
  }
  return query;
};

export function sliceOffQuery(url: string) {
  return url.match(/\?.+/g)?.[0];
}

export function convertUrl(url: string) {
  let res = url.match(/[a-z]+\/\d+/g);
  if (!res) {
    res = url.match(/\/\w+/g);
    return `${res?.[res.length - 1]}`;
  }
  return `/${res?.[0]}`;
}

export function getId(url: string) {
  const res = url.match(/\d+/g);
  return `${res?.[0].slice(0)}`;
}

export const CV = (...args: string[]) => {
  return `${args.join(" ")}`;
};
