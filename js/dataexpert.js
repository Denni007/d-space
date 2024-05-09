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
      //  console.log(trackingData)
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
          var data = JSON.stringify(Object.fromEntries(new FormData(document.querySelector('.form-vertical'))));
          visitor.convertion_data = data;

          visitor.conversion_page = location.origin + location.pathname;
          visitor.visits_at_conversion = (visitor.visits || []).length;
          visitor.pageviews_before_conversion = visitor.pageviews || 0;
          console.log('convert')
          window.dataLayer.push({
            'event':'contact_us',
            'event_label':btoa(JSON.parse(data).name),
            'event_category':btoa(JSON.parse(data).email),
            'event_action':btoa(JSON.parse(data).Message)
          })
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
                console.log(e);
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
   // console.log(e);
}
urlcheck.test(document.location.href) ? (dspaceexpert.visits.create(),
    console.log("1")) : -1 == document.referrer.indexOf("/127.0.0.1:5500/") ? (dspaceexpert.visits.create(),
        console.log("2")) : 0 == allvisits && (dspaceexpert.visits.create(),
            console.log("3"));
 (window);
 
 var firstvisit = document.getElementById('firstvisit');
 var sourcefirstvisit = document.getElementById('sourcefirstvisit');
 var sourcelastvisit = document.getElementById('sourcelastvisit');
  var device = document.getElementById('device');
 // var profile = document.getElementById('profile');
 // var geocity = document.getElementById('geocity');
 // var geoip = document.getElementById('geoip');
 var totalpageviews2 = document.getElementById('totalpageviews');


 // Get the data from localStorage
 var data = localStorage.getItem('dspaceexpert_visitor');
 data = JSON.parse(data);
 var visits = data.visits;
 var lastvisit = visits[visits.length - 1];

 // Date format
 var date = new Date(data.first_website_visit);
 var year = date.getFullYear();
 var month = date.getMonth(); // returns 0 for January
 var day = date.getDate();
 var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 var monthName = monthNames[month];
 var formattedDate = day + " " + monthName + " " + year;

 // Geolocation data
 try {
   var IPlocation = JSON.parse(sessionStorage.getItem('_ipgeolocation_geolocation')).ip;
   var IPcity = JSON.parse(sessionStorage.getItem('_ipgeolocation_geolocation')).city;
 } catch (e) { };

 var datasourcefirstvisit = JSON.stringify(data.visits[0]);
 if (datasourcefirstvisit.indexOf('utm_source') > -1) {
   datasourcefirstvisit = data.visits[0].utm_source;
 } else if (datasourcefirstvisit.indexOf('gclid') > -1) {
   datasourcefirstvisit = 'google / cpc';
 } else {
   if (JSON.stringify(data.visits[0].referrer).indexOf(document.location.hostname) > -1) {
     datasourcefirstvisit = 'direct'
   } else {
     datasourcefirstvisit = data.visits[0].referrer;
   }
 }

 var datasourcelastvisit = JSON.stringify(lastvisit);
 if (datasourcelastvisit.indexOf('utm_source') > -1) {
   datasourcelastvisit = lastvisit.utm_source;
 } else if (datasourcefirstvisit.indexOf('gclid') > -1) {
   datasourceflastvisit = 'google / cpc';
 } else {
   if (JSON.stringify(lastvisit.referrer).indexOf(document.location.hostname) > -1) {
     datasourcelastvisit = 'direct'
   } else {
     datasourcelastvisit = lastvisit.referrer;
   }
 }
 
 var devicecategory = lastvisit.deviceType != "desktop/laptop" ? `<div class="row  row-justify-between"><div>${lastvisit.device}</div><div class="circle bg-primary-3"><img src="/images/iphone-x.svg" alt="" class="icon"></div></div>`:`<div class="row row-justify-between"><div>${lastvisit.device}</div><div class="circle bg-primary-3"><img src="/images/desktop.svg" alt="" class="icon "></div></div>`;
 // profile
 // var profiling = '';
 // if (data.pageviews > 8) {
 //   profiling = 'prospect chaud';
 // } else {
 //   profiling = 'prospect';
 // }

 // Set the contents of the span element
 if(window.location.pathname == "/"){
  firstvisit.innerHTML += formattedDate;
  sourcefirstvisit.innerHTML += datasourcefirstvisit;
  sourcelastvisit.innerHTML += datasourcelastvisit;
  device.innerHTML +=  devicecategory;
  // geocity.innerHTML += IPcity;
  // geoip.innerHTML += IPlocation
  totalpageviews2.innerHTML += data.pageviews;
 }
 
if(location.hostname == "www.starluxetech"){
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WVWQ985');
}
 //gtm


//anytrack
!function(e,t,n,s,a){(a=t.createElement(n)).async=!0,a.src="https://assets.anytrack.io/XvXYxAtClcL4.js",(t=t.getElementsByTagName(n)[0]).parentNode.insertBefore(a,t),e[s]=e[s]||function(){(e[s].q=e[s].q||[]).push(arguments)}}(window,document,"script","AnyTrack");
 function deleteAll() {
   localStorage.clear('dspaceexpert_visitor');
   sessionStorage.clear('_ipgeolocation_geolocation');
 }
