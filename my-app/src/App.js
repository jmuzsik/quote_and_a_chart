import React, { Component } from 'react';
import './App.css';
import AdultMortalityProbability from './poem-1-data/AdultMortalityProbability';
import AlcoholDeaths from './poem-1-data/AlcoholDeaths';
import MortalityBeforeFiveChart from './poem-1-data/Before5Chart';
import HIVKnowledge from './poem-1-data/HIVKnowledge';
import IntimatePartnerViolence from './poem-1-data/IntimatePartnerViolence';
import LifeExpectancy from './poem-1-data/LifeExpectancy';
import OpenDefChart from './poem-1-data/OpenDefChart';
import PopulationBelowPovertyLine from './poem-1-data/PopulationBelowPovertyLine';
import SexualViolence from './poem-1-data/SexualViolence';
import SexWorkersSyphilis from './poem-1-data/SexWorkersSyphilis';

import 'jquery/src/jquery';

var WikiquoteApi = (function () {

  var wqa = {};

  var API_URL = "https://en.wikiquote.org/w/api.php";

  /**
   * Query based on "titles" parameter and return page id.
   * If multiple page ids are returned, choose the first one.
   * Query includes "redirects" option to automatically traverse redirects.
   * All words will be capitalized as this generally yields more consistent results.
   */
  wqa.queryTitles = function (titles, success, error) {
    window.$.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "query",
        redirects: "",
        titles: titles
      },
      success: function (result, status) {
        var pages = result.query.pages;
        var pageId = -1;
        for (var p in pages) {
          var page = pages[p];
          // api can return invalid recrods, these are marked as "missing"
          if (!("missing" in page)) {
            pageId = page.pageid;
            break;
          }
        }
        if (pageId > 0) {
          success(pageId);
        } else {
          error("No results");
        }
      },

      error: function (xhr, result, status) {
        error("Error processing your query");
      }
    });
  };

  /**
   * Get the sections for a given page.
   * This makes parsing for quotes more manageable.
   * Returns an array of all "1.x" sections as these usually contain the quotes.
   * If no 1.x sections exists, returns section 1. Returns the titles that were used
   * in case there is a redirect.
   */
  wqa.getSectionsForPage = function (pageId, success, error) {
    window.$.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "parse",
        prop: "sections",
        pageid: pageId
      },

      success: function (result, status) {
        var sectionArray = [];
        var sections = result.parse.sections;
        for (var s in sections) {
          var splitNum = sections[s].number.split('.');
          if (splitNum.length > 1 && splitNum[0] === "1") {
            sectionArray.push(sections[s].index);
          }
        }
        // Use section 1 if there are no "1.x" sections
        if (sectionArray.length === 0) {
          sectionArray.push("1");
        }
        success({ titles: result.parse.title, sections: sectionArray });
      },
      error: function (xhr, result, status) {
        error("Error getting sections");
      }
    });
  };

  /**
   * Get all quotes for a given section.  Most sections will be of the format:
   * <h3> title </h3>
   * <ul>
   *   <li>
   *     Quote text
   *     <ul>
   *       <li> additional info on the quote </li>
   *     </ul>
   *   </li>
   * <ul>
   * <ul> next quote etc... </ul>
   *
   * The quote may or may not contain sections inside <b /> tags.
   *
   * For quotes with bold sections, only the bold part is returned for brevity
   * (usually the bold part is more well known).
   * Otherwise the entire text is returned.  Returns the titles that were used
   * in case there is a redirect.
   */
  wqa.getQuotesForSection = function (pageId, sectionIndex, success, error) {
    window.$.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "parse",
        noimages: "",
        pageid: pageId,
        section: sectionIndex
      },

      success: function (result, status) {
        var quotes = result.parse.text["*"];
        var quoteArray = []
        // Find top level <li> only
        var $lis = window.$(quotes).find('li:not(li li)');
        $lis.each(function () {
          // Remove all children that aren't <b>
          window.$(this).children().remove(':not(b)');
          var $bolds = window.$(this).find('b');

          // If the section has bold text, use it.  Otherwise pull the plain text.
          if ($bolds.length > 0) {
            quoteArray.push($bolds.html());
          } else {
            quoteArray.push(window.$(this).html());
          }
        });
        var threeLongestQuotes = []
        quoteArray = quoteArray.sort(function(a, b) {
          return b.length - a.length;
        });
        threeLongestQuotes = quoteArray.slice(0, 3)
        success({ titles: result.parse.title, quotes: threeLongestQuotes });
      },
      error: function (xhr, result, status) {
        error("Error getting quotes");
      }
    });
  };

  /**
   * Get a random quote for the given title search.
   * This function searches for a page id for the given title, chooses a random
   * section from the list of sections for the page, and then chooses a random
   * quote from that section.  Returns the titles that were used in case there
   * is a redirect.
   */
  wqa.getRandomQuote = function (titles, success, error) {

    var errorFunction = function (msg) {
      error(msg);
    };
    var chooseQuote = function (quotes) {
      var randomNum = Math.floor(Math.random() * quotes.quotes.length);
      success({ titles: quotes.titles, quote: quotes.quotes[randomNum] });
    };

    var getQuotes = function (pageId, sections) {
      var randomNum = Math.floor(Math.random() * sections.sections.length);
      wqa.getQuotesForSection(pageId, sections.sections[randomNum], chooseQuote, errorFunction);
    };

    var getSections = function (pageId) {
      wqa.getSectionsForPage(pageId, function (sections) { getQuotes(pageId, sections); }, errorFunction);
    };

    wqa.queryTitles(titles, getSections, errorFunction);
  };
  return wqa;
}());
function success(quote) {
  console.log(quote)
}
function error(err) {
  console.log(err)
}
console.log(WikiquoteApi.getRandomQuote('Mortality', success, error))

class App extends Component {
  render() {
    return (
      <div className="App">
        <AdultMortalityProbability />
        <AlcoholDeaths />
        <MortalityBeforeFiveChart />
        <HIVKnowledge />
        <IntimatePartnerViolence />
        <LifeExpectancy />
        <OpenDefChart />
        <PopulationBelowPovertyLine />
        <SexualViolence />
        <SexWorkersSyphilis />
      </div>
    );
  }
}

export default App;
