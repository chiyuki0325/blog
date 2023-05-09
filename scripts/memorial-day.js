'use strict';

hexo.extend.filter.register('after_render:html', function (html, data) {
  function formatDate(date) {
    let d = new Date(date),
      month = (d.getMonth() + 1).toString(),
      day = d.getDate().toString(),
      year = d.getFullYear().toString();
  
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
  
    return [year, month, day].join('-');
  }
  const config = this.config;

  if (!config.memorial_day || !config.memorial_day.enable || html.search('<html') === -1 || html.search('grayscale(100%)') > -1) {
    return html;
  } 

  const day = config.memorial_day.day;

  if (!day) {
    this.log.error(`hexo-memorial-day: The day value is empty`);
    return;
  }

  let dayStr;

  if (day instanceof Date) {
    if (isNaN(day.getTime()) || day.getTime() <= 0) {
      this.log.error(`hexo-memorial-day: The day value is in an invalid format`);
      return;
    }
    dayStr = formatDate(day);
  } else if (typeof day === 'string') {
    if (!/^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/.test(day) && !/^\d{1,2}[/-]\d{1,2}$/.test(day)) {
      this.log.error(`hexo-memorial-day: The day value is in an invalid format`);
      return;
    }
    dayStr = day;
  } else {
    this.log.error(`hexo-memorial-day: The day value is an invalid format`);
    return;
  }

  const css = 'html { \
    -webkit-filter: grayscale(100%); /* webkit */ \
    -moz-filter: grayscale(100%); /* firefox */ \
    -ms-filter: grayscale(100%); /* ie9 */ \
    -o-filter: grayscale(100%); /* opera */ \
    filter: grayscale(100%); \
    filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); filter:gray; /* ie9- */ \
  }';

  const js = `
  <script type="text/javascript">
    const applyMemorialDay = function () {
      var dayStr = '${dayStr.replace(/-/g, '/')}';
      if (/^\\d{1,2}\\/\\d{1,2}$/.test(dayStr)) {
        dayStr = new Date().getFullYear() + '/' + dayStr;
      }
      if (!/^\\d{4}\\/\\d{1,2}\\/\\d{1,2}$/.test(dayStr)) {
        return ;
      }
      var day = new Date(dayStr);
      var now = new Date();
      var isMemorialDay = now.getFullYear() === day.getFullYear() && now.getMonth() === day.getMonth() && now.getDate() === day.getDate();
      // isMemorialDay = true;
      if (isMemorialDay) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '${css}';
        document.getElementsByTagName('HEAD').item(0).appendChild(style);
      }
    }
    window.addEventListener(
      "load",
      applyMemorialDay,
      false
    )
    const memorialDayInterval = setInterval(
      () => {
        if('InstantClick' in window) {
          InstantClick.on(
          'change',
          applyMemorialDay
          )
          clearInterval(memorialDayInterval)
        }
      }, 100
    )

  </script>
  `;

  return js + html;
})

