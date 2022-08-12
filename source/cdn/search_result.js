// Hexo search result plugin modified by YidaozhanYa

+function() {
  const searchResult = document.getElementById("plugin-search-result")
  searchResult.textContent = '加载中 ...'
  fetchData('/search.xml').then(document => {
    const entries = analyzeData(document, getSearchQueryFromUrlParams())
    searchResult.innerHTML = makeSearchResult(entries)
  })

  function fetchData (fetchUrl) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', fetchUrl, true)
      xhr.responseType = 'document'
      xhr.overrideMimeType('text/xml')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200 || xhr.status === 304) {
            resolve(xhr.response)
          }
        }
      }
      xhr.send(null)
    })
  }

  function analyzeData(document, query) {
    const entries = document.getElementsByTagName('entry')
    const matchEntries = []
    for (var entry of entries) {
      const regExp = new RegExp(query,"i")
      if (regExp.test(entry.children[0].textContent) ||
          regExp.test(entry.children[2].textContent) ||
          regExp.test(entry.children[3].textContent)) {
        matchEntries.push(entry)
      }
    }
    return matchEntries
  }

  function makeSearchResult (entries) {
    let innerHTML = ''
    const keyword = getSearchQueryFromUrlParams()
    innerHTML += '<h3>🔍 <font color=red>'+keyword+'</font> 的搜索结果</h1>';
    for (let entry of entries) {
      innerHTML += '<div class="search-result-entry">'
      const title = entry.children[0].textContent
      const url = entry.children[2].textContent
      const content = entry.children[3].textContent
      innerHTML += '<h2><a href="' + url + '">' + title + '</a></h2>'
      const thumbnail = /<img[^>]*>/.exec(content)
      if (thumbnail && thumbnail.length >= 1) {
        innerHTML += '<div class="search-result-thumbnail">' + thumbnail[0] + '</div>'
      }
      innerHTML += '... ' + content.replace(/<[^>]*>/g, '').substring(0, 150).replaceAll(keyword,'<font color=red>'+keyword+'</font>') + ' ...'
      innerHTML += '</div>'
    }
    innerHTML += '<div><h3><hr></h3>';
    innerHTML += '<h3><a href="/search">⬅️ 返回搜索</a></h3></div>';
    return innerHTML
  }

  function getSearchQueryFromUrlParams () {
    const params = window.location.search.substring(1).split('&')
    const search = params.filter(param => param.search(/$search=/))
    return search.length > 0 ? UrlDecode(search[0].split('=')[1]) : null
  }

  function UrlDecode(zipStr){ 
    var uzipStr = ''; 
    for (var i = 0; i < zipStr.length; i += 1) {
      var chr = zipStr.charAt(i); 
      if (chr === '+') { 
        uzipStr += ' ';
      } else if (chr === '%') { 
        var asc = zipStr.substring(i + 1, i + 3); 
        if (parseInt('0x' + asc) > 0x7f) {
          uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i+3, i+9).toString()); 
          i += 8;
        }else{ 
          uzipStr += AsciiToString(parseInt('0x' + asc)); 
          i += 2;
        } 
      }else{ 
        uzipStr += chr; 
      } 
    } 
  
    return uzipStr; 
  } 
   
  function AsciiToString(asccode){ 
    return String.fromCharCode(asccode); 
  }
}()

