(function(window) {
    var trackedParams = ["fbclid", "gclid", "utm_source", "utm_medium", "utm_name", "utm_term", "utm_campaign", "utm_content"];
    var fbPixelId = getCookie("_fbp");
    var fbClickId = getCookie("_fbc");
    
    // Check if tracked parameters or fbPixelId or fbClickId exists
    if (trackedParams.some(param => window.location.search.includes(param)) || fbPixelId || fbClickId) {
      var clientId = getClientId();
      var topLevelDomain = getTopLevelDomain();
      var referrer = document.referrer || "direct";
      var now = Date.now();
      
      // Set fbClickId if fbclid parameter exists and not already set
      var url = new URL(window.location.href);
      var fbclid = url.searchParams.get("fbclid");
      if (fbclid && (!fbClickId || (fbClickId.split(".")[fbClickId.split(".").length - 1] !== decodeURIComponent(fbclid)))) {
        fbClickId = "fb." + (topLevelDomain.split(".").length - 1) + "." + now + "." + decodeURIComponent(fbclid);
      }
      
      // Set fbPixelId if not already set
      if (!fbPixelId) {
        var min = 1000000000;
        var max = 2147483647;
        fbPixelId = "fb." + (topLevelDomain.split(".").length - 1) + "." + now + "." + Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      // Create object with all tracking data
      var trackingData = {
        referrer: referrer,
        ga_client_id: clientId,
        fbc: fbClickId,
        fbp: fbPixelId
      };
      trackedParams.forEach(param => {
        var value = url.searchParams.get(param);
        if (value) {
          trackingData[param] = decodeURIComponent(value.replace(/\+/g, " "));
        }
      });
      console.log(trackingData)
      // Store tracking data in cookie
      setCookie("_ds", JSON.stringify(trackingData));
    }
    
    // Helper function to get a cookie value by name
    function getCookie(name) {
      var value = ("; " + document.cookie).split("; " + name + "=");
      return value.length === 2 ? value.pop().split(";").shift() : null;
    }
    function setCookie(key,name) {
        var expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 2592000000); // Set cookie expiration to 30 days from now
  var cookieValue = JSON.stringify(trackingData);
  document.cookie = "_ds=" + name + "; SameSite=None; Secure; expires=" + expirationDate.toUTCString() + "; path=/";

      }
    
    // Helper function to get the Google Analytics client ID
    function getClientId() {
      try {
        var trackers = ga.getAll();
        for (var i = 0; i < trackers.length; i++) {
          if (trackers[i].get("trackingId") === "	G-123456ABC") {
            return trackers[i].get("clientId");
          }
        }
      } catch (error) {}
      try {
        return ga.getAll()[0].get("clientId");
      } catch (error) {}
      return null;
    }

    function getTopLevelDomain() {
        var cookieName = "weird_get_top_level_domain=cookie";
        var domainParts = document.location.hostname.split(".");
        for (var i = domainParts.length - 1; i >= 0; i--) {
          var domain = domainParts.slice(i).join(".");
          document.cookie = cookieName + ";domain=." + domain + ";";
          if (document.cookie.indexOf(cookieName) > -1) {
            document.cookie = cookieName.split("=")[0] + "=;domain=." + domain + ";expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            return domain;
          }
        }
      }
      function getDeviceType() {
        const userAgent = navigator.userAgent;
        
        if (/Android/i.test(userAgent)) {
          return "Android";
        }
        
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
          return "iOS";
        }
        
        if (/Windows Phone/i.test(userAgent)) {
          return "Windows Phone";
        }
        
        if (/Windows/i.test(userAgent)) {
          return "Windows PC";
        }
        
        if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent)) {
          return "Mac";
        }
        
        if (/Linux/i.test(userAgent)) {
          return "Linux";
        }
        
        return "Unknown";
      }
      function getDeviceCategory() {
        const userAgent = navigator.userAgent;
        if (/mobile/i.test(userAgent)) {
          return "phone";
        } else if (/tablet/i.test(userAgent)) {
          return "tablet";
        } else {
          return "desktop/laptop";
        }
      }
      

    const dspaceexpert = {
        getCookie2: function (name) {
            var t = ["fbclid", "gclid", "utm_source", "utm_medium", "utm_name", "utm_term", "utm_campaign", "utm_content"]

            const cookieName = `${name}=`;
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
              let cookie = cookies[i];
              while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
              }
              if (cookie.indexOf(cookieName) == 0) {
                return cookie.substring(cookieName.length, cookie.length);
              }
            }
            return null;
          },
          getDs: function () {
            const cookie = this.getCookie2('_ds');
            if (cookie) {
              return JSON.parse(cookie);
            }
            return '';
          },
          fetch: function () {
            return JSON.parse(window.localStorage.getItem("dspaceexpert_visitor"))
        },
        destroy: function() {
            return e.localStorage.removeItem("dspaceexpert_visitor")
        },
        createInstance: function () {
            const urlParams = [
                "fbclid",
                "gclid",
                "utm_source",
                "utm_medium",
                "utm_name",
                "utm_term",
                "utm_campaign",
                "utm_content"
              ];
            const instance = {
                referrer: document.referrer.length ? document.referrer : "direct",
                browser_timezone: new Date().getTimezoneOffset() / 60,
                browser_language: window.navigator.language,
                landing_page: window.location.origin + window.location.pathname,
                screen_height: window.screen.height,
                screen_width: window.screen.width,
                fbp: this.getDs().fbp,
                fbc: this.getDs().fbc,
                gclid: this.getDs().gclid,
                ga_client_id: this.getDs().ga_client_id,
                te_campaign: this.getDs().utm_campaign,
                te_source: this.getDs().utm_source,
                te_medium: this.getDs().utm_medium,
                device:getDeviceType(),
                deviceType:getDeviceCategory()
              };
              for (let i = 0; i < urlParams.length; i++) {
                const param = urlParams[i];
                const regex = new RegExp("[?&]" + (param.replace(/[\[\]]/g, "\\$&")) + "(=([^&#]*)|&|#|$)");
                const results = regex.exec(window.location.href);
                if (results && results[2]) {
                  instance[param] = decodeURIComponent(results[2].replace(/\+/g, " "));
                }
              }
              return instance;
        },
        
        update: function (properties) {
            const visitor = this.fetch() || this.create();
            for (let prop in properties) {
              if (properties.hasOwnProperty(prop)) {
                visitor[prop] = properties[prop];
              }
            }
            localStorage.setItem('dspaceexpert_visitor', JSON.stringify(visitor));
            return visitor;
          },
          convert: function (properties) {
            const visitor = this.update(properties);
            visitor.converted_at = new Date().toISOString();
            visitor.conversion_page = location.origin + location.pathname;
            visitor.visits_at_conversion = (visitor.visits || []).length;
            visitor.pageviews_before_conversion = visitor.pageviews || 0;
            localStorage.setItem('dspaceexpert_visitor', JSON.stringify(visitor));
            return visitor;
          },
        create: function () {
            const visitor = this.createInstance();
        visitor.last_visit = parseInt(new Date().getTime() / 1000);
        visitor.pageviews = 1;
        visitor.first_website_visit = new Date().toISOString();
        localStorage.setItem('dspaceexpert_visitor', JSON.stringify(visitor));
        return visitor;
        },
    
        visits: {
            recently: function () {
                var e = dspaceexpert.fetch();
                return !!e.last_visit && (parseInt((new Date).getTime() / 1e3) - e.last_visit) / 3600 < .5
            },
            create: function () {
                var e = dspaceexpert.fetch();
                console.log(e);
                e.visits = (e?.visits || []);
                var t = dspaceexpert.createInstance();
                return (t.id = ((65536 * (1 + Math.random())) | 0).toString(16).substring(1)), (t.date = new Date().toISOString()), e.visits.push(t), (e.last_visit = parseInt(new Date().getTime() / 1e3)), dspaceexpert.update(e), e;
                return null;
            },
            fetch: function(e) {
                var t = i.fetch()
                  , n = t.visits.filter((function(t) {
                    return t.id === e
                }
                ))[0];
                return n.index = t.visits.map((function(e) {
                    return e.id
                }
                )).indexOf(e),
                n
            },
            delete: function(e) {
                var t = i.fetch()
                  , n = i.visits.fetch(e);
                return t.visits = t.visits.splice(n.index, 1),
                i.update(t)
            },
            all: function () {
                return dspaceexpert.fetch().visits || []
            }
        },
        pageviews: {
            add: function () {
                var e = dspaceexpert.fetch();
                return e.pageviews = e.pageviews + 1 || 1,
                dspaceexpert.update(e)
            }
        },
    
    }
    dspaceexpert.fetch()?(dspaceexpert.visits.recently() || dspaceexpert.visits.create(),
    dspaceexpert.pageviews.add()) : dspaceexpert.create();
    window.dspaceexpert = dspaceexpert;
})(window);



var urlcheck = /utm|gclid|fbp|fbc/;
try {
    var allvisits = dspaceexpert.visits.all().length
} catch (e) {
    console.log(e);
}
urlcheck.test(document.location.href) ? (dspaceexpert.visits.create(),
    console.log("1")) : -1 == document.referrer.indexOf("/127.0.0.1:5500") ? (dspaceexpert.visits.create(),
        console.log("2")) : 0 == allvisits && (dspaceexpert.visits.create(),
            console.log("3"));
 (window);

 