// Generated by CoffeeScript 1.7.1
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['external/modernizr', 'jquery', 'modules/clean/ajax', 'modules/core/browser', 'modules/core/html', 'modules/core/i18n', 'modules/core/notify', 'modules/core/uri', 'modules/clean/components/ajax_form', 'modules/clean/em_string', 'modules/clean/gandalf_util', 'modules/clean/unity/features', 'modules/clean/unity/features/destiny_logger', 'modules/clean/unity/features/web_destiny'], function(Modernizr, $j, ajax, Browser, HTML, _arg, Notify, URI, AjaxForm, Emstring, GandalfUtil, UnityFeatures, DestinyLogger, WebDestiny) {
  var WebDestinyInterface, _;
  _ = _arg._;
  WebDestinyInterface = (function() {
    function WebDestinyInterface($root) {
      this._fill_login_error = __bind(this._fill_login_error, this);
      this._show_unity_server_error = __bind(this._show_unity_server_error, this);
      this._show_unity_client_error = __bind(this._show_unity_client_error, this);
      this._web_destiny_login = __bind(this._web_destiny_login, this);
      this._show_web_destiny = __bind(this._show_web_destiny, this);
      this._web_destiny_connect_callback = __bind(this._web_destiny_connect_callback, this);
      this._check_if_previous_login_failed = __bind(this._check_if_previous_login_failed, this);
      this.maybe_show_web_destiny = __bind(this.maybe_show_web_destiny, this);
      this.$login_form = $root.find('.login-form');
      this.cont = this.$login_form.find("input[name='cont']").val();
      this.$web_destiny_container = $root.find('#web-destiny-container');
      this.button = this.$web_destiny_container.find("#continue-as-button");
    }

    WebDestinyInterface.prototype.maybe_show_web_destiny = function() {
      if (this._check_if_previous_login_failed()) {
        this._show_unity_server_error();
      }
      if (!this._is_destiny_enabled()) {
        return;
      }
      this._web_destiny = new WebDestiny();
      DestinyLogger.report_event('web_destiny_start_connection_to_unity');
      UnityFeatures.add_on_ready_callback(this._unity_ready_callback);
      return this._web_destiny.start_connection(this._web_destiny_connect_callback);
    };

    WebDestinyInterface.prototype._unity_ready_callback = function() {
      return DestinyLogger.report_event('web_destiny_unity_ready');
    };

    WebDestinyInterface.prototype._check_if_previous_login_failed = function() {
      return this.cont.indexOf("/login_complete?refresh_token=") === 0;
    };

    WebDestinyInterface.prototype._is_destiny_enabled = function() {
      return GandalfUtil.getGandalfRule("unity-web-destiny") && (WebDestiny != null) && (window.location.pathname === "/login" || GandalfUtil.getGandalfRule("unity-web-destiny-all-pages")) && !this._is_growth_logout_experiment_enabled();
    };

    WebDestinyInterface.prototype._is_growth_logout_experiment_enabled = function() {
      var uri_query;
      uri_query = URI.parse(window.location.pathname + window.location.search).getQuery();
      return GandalfUtil.getGandalfRule("growth_web_logout_client") && 'src' in uri_query && uri_query['src'] === 'logout';
    };

    WebDestinyInterface.prototype._web_destiny_connect_callback = function(name) {
      var display_name_text, name_box;
      DestinyLogger.report_event('web_destiny_unity_triggered');
      display_name_text = this._make_display_name_text(name);
      name_box = this.$web_destiny_container.find(".continue-as-user-name");
      name_box.text(display_name_text);
      this.button.click(this._web_destiny_login);
      return this._show_web_destiny();
    };

    WebDestinyInterface.prototype._make_display_name_text = function(name) {
      return _("Continue as %(real_name)s", {
        comment: "Log in automatically as NAME"
      }).format({
        real_name: name
      });
    };

    WebDestinyInterface.prototype._show_web_destiny = function() {
      DestinyLogger.report_event('web_destiny_display_continue_as_animation_start');
      this.button.attr("disabled", false);
      return this.$web_destiny_container.hide().css({
        visibility: "visible",
        display: ""
      }).fadeIn("fast", function() {
        return DestinyLogger.report_event('web_destiny_display_continue_as_animation_end');
      });
    };

    WebDestinyInterface.prototype._web_destiny_login = function() {
      var check_signed_in_ajax_callback, first_tab_url, second_tab_url, unity_client_error_callback;
      DestinyLogger.report_event('web_destiny_continue_as_clicked');
      if (window.location.pathname !== "/login" && this.cont === "") {
        this.cont = window.location.pathname + window.location.search;
      }
      if (Browser.msie || !Modernizr.localstorage || this._web_destiny.is_direct_allowed()) {
        first_tab_url = this.cont;
        second_tab_url = "/";
      } else {
        first_tab_url = "/";
        second_tab_url = this.cont;
      }
      if (Modernizr.localstorage) {
        localStorage.setItem('web-destiny-redirect-uri', second_tab_url);
      }
      check_signed_in_ajax_callback = this._get_check_signed_in_ajax_callback(this._show_unity_client_error);
      unity_client_error_callback = this._get_unity_client_error_callback(check_signed_in_ajax_callback, this._show_unity_client_error);
      this._web_destiny.continue_as_user(first_tab_url, unity_client_error_callback);
      Notify.warning(_("We\u2019re trying to log you in automatically"));
      return this.button.attr("disabled", true);
    };

    WebDestinyInterface.prototype._get_unity_client_error_callback = function(check_signed_in_ajax_callback, show_unity_client_error_callback) {
      return function() {
        return new ajax.AuthenticatedRequest({
          url: "/is_signed_in",
          success: check_signed_in_ajax_callback,
          error: show_unity_client_error_callback
        });
      };
    };

    WebDestinyInterface.prototype._get_check_signed_in_ajax_callback = function(show_unity_client_error_callback) {
      return function(data) {
        if (data === 'ok') {
          return Browser.reload();
        } else {
          return show_unity_client_error_callback();
        }
      };
    };

    WebDestinyInterface.prototype._show_unity_client_error = function() {
      this._fill_login_error(_("Sorry, we weren\u2019t able to sign you in. Please enter your email and password to sign in."));
      this.button.attr("disabled", true);
      return DestinyLogger.report_event('web_destiny_client_error');
    };

    WebDestinyInterface.prototype._show_unity_server_error = function() {
      this._fill_login_error(_("Please enter your email and password to sign in."));
      return DestinyLogger.report_event('web_destiny_server_error');
    };

    WebDestinyInterface.prototype._fill_login_error = function(message_text) {
      return AjaxForm.fill_errors(this.$login_form, {
        login_email: {
          message_text: message_text
        }
      });
    };

    return WebDestinyInterface;

  })();
  return WebDestinyInterface;
});

//# sourceMappingURL=web_destiny_ui.map
