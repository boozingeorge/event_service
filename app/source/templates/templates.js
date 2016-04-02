angular.module('EventService').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/burger.html',
    "<md-fab-toolbar id=\"burger-toolbar\" md-open=\"$ctrl.demo.isOpen\" count=\"$ctrl.demo.count\" md-direction=\"right\">\n" +
    "  <md-fab-trigger class=\"align-with-text\">\n" +
    "    <md-button aria-label=\"menu\" class=\"md-fab md-primary\">\n" +
    "      <md-icon md-svg-src=\"svg/ic_menu_24px.svg\"></md-icon>\n" +
    "    </md-button>\n" +
    "  </md-fab-trigger>\n" +
    "  <md-toolbar>\n" +
    "    <md-fab-actions class=\"md-toolbar-tools\">\n" +
    "      <md-button aria-label=\"label\" class=\"md-icon-button\">\n" +
    "        <md-icon md-svg-src=\"svg/ic_add_location_48px.svg\"></md-icon>\n" +
    "      </md-button>\n" +
    "      <md-button aria-label=\"comment\" class=\"md-icon-button\">\n" +
    "        <md-icon md-svg-src=\"svg/ic_account_box_48px.svg\"></md-icon>\n" +
    "      </md-button>\n" +
    "      <a href=\"/logout\">\n" +
    "        <md-button aria-label=\"photo\" class=\"md-icon-button\">\n" +
    "          <md-icon md-svg-src=\"svg/ic_exit_to_app_48px.svg\"></md-icon>\n" +
    "        </md-button>\n" +
    "      </a>\n" +
    "    </md-fab-actions>\n" +
    "  </md-toolbar>\n" +
    "</md-fab-toolbar>\n"
  );


  $templateCache.put('templates/cards.html',
    "<md-card style=\"position: relative\" flex=\"100\" ng-repeat=\"event in $ctrl.events\">\n" +
    "  <md-card-title>\n" +
    "    <md-card-title-text>\n" +
    "      <span class=\"md-headline\">{{event.title}}</span>\n" +
    "      <span class=\"md-subhead\">{{event.description}}</span>\n" +
    "    </md-card-title-text>\n" +
    "    <md-card-title-media>\n" +
    "      <div class=\"md-media-sm card-media\"></div>\n" +
    "    </md-card-title-media>\n" +
    "  </md-card-title>\n" +
    "  <md-card-actions layout=\"row\" layout-align=\"end center\">\n" +
    "    <md-button>Подробнее</md-button>\n" +
    "    <md-button>Пойду</md-button>\n" +
    "  </md-card-actions>\n" +
    "</md-card>\n"
  );


  $templateCache.put('templates/main.html',
    "<map events=\"$ctrl.events\"></map>\n" +
    "<div class=\"tools\" layot=\"row\">\n" +
    "  <menu events=\"$ctrl.events\"></menu>\n" +
    "  <cards events=\"$ctrl.events\"></cards>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/map.html',
    "<div id=\"map\"></div>\n"
  );


  $templateCache.put('templates/menu.html',
    "<div id=\"menu\" layout=\"row\" layout-align=\"start center\">\n" +
    "  <div id=\"burger-grid\">\n" +
    "    <burger></burger>\n" +
    "  </div>\n" +
    "  <div flex=\"100\" id=\"search-grid\">\n" +
    "    <search events=\"$ctrl.events\"></search>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/search.html',
    "<form id=\"search\" ng-submit=\"$event.preventDefault()\">\n" +
    "  <md-autocomplete ng-disabled=\"$ctrl.isDisabled\" md-no-cache=\"$ctrl.noCache\" md-selected-item=\"$ctrl.selectedItem\"\n" +
    "                   md-search-text-change=\"\"\n" +
    "                   md-search-text=\"$ctrl.searchText\"\n" +
    "                   md-selected-item-change=\"\"\n" +
    "                   md-items=\"item in $ctrl.querySearch($ctrl.searchText)\"\n" +
    "                   md-item-text=\"item.display\"\n" +
    "                   md-min-length=\"0\"\n" +
    "                   placeholder=\"Поиск события\">\n" +
    "    <md-item-template>\n" +
    "      <span md-highlight-text=\"$ctrl.searchText\" md-highlight-flags=\"^i\">{{item.display}}</span>\n" +
    "    </md-item-template>\n" +
    "    <md-not-found>\n" +
    "      Не найдено \"{{$ctrl.searchText}}\"\n" +
    "      <!--<a ng-click=\"$ctrl.newEvent($ctrl.searchText)\">Создать событие</a>-->\n" +
    "    </md-not-found>\n" +
    "  </md-autocomplete>\n" +
    "</form>\n"
  );

}]);
