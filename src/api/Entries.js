import Utils from "../Utils";

export const addEntry = async (
  firstName,
  lastName,
  notes,
  isSignedOut = false,
  lastSignedOut = ""
) => {
  const fullName = `${firstName} ${lastName}`;
  let xhr = new XMLHttpRequest();
  await xhr.open(
    "POST",
    "https://us-central1-envoy-visitor-check-in.cloudfunctions.net/entries",
    true
  );

  await xhr.send(
    JSON.stringify({
      firstName,
      lastName,
      fullName,
      notes,
      isSignedOut,
      lastSignedOut,
      firstSignedIn: Utils.getTodayDate()
    })
  );
};

export const getEntries = (filter = "") => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      let entries = [];
      console.log("xhr.responseText", xhr.responseText);
      if (xhr.responseText) {
        var res = JSON.parse(xhr.responseText);
        // data = JSON.parse(res);
        for (let k in res) {
          // TODO(stephel): construct the type to strictly enforce the data type.
          entries.push({ ...res[k], id: k });
        }
      }
      resolve(entries);
    };
    xhr.onerror = reject;
    if (filter.length === 0) {
      xhr.open(
        "GET",
        "https://us-central1-envoy-visitor-check-in.cloudfunctions.net/entries"
      );
    } else {
      xhr.open(
        "GET",
        `https://us-central1-envoy-visitor-check-in.cloudfunctions.net/entries?filter[name]=${filter}`
      );
    }
    xhr.send();
  });
};

export const patchEntry = async id => {
  let xhr = new XMLHttpRequest();
  await xhr.open(
    "PATCH",
    `https://us-central1-envoy-visitor-check-in.cloudfunctions.net/entries/${id}`,
    true
  );

  await xhr.send(
    JSON.stringify({
      isSignedOut: true,
      lastSignedOut: Utils.getTodayDate()
    })
  );
};
