var profilesKey = 'darksouls3_profiles';

(function($) {
    'use strict';

    var themes = {
        "Standard" : "css/bootstrap.min.css",
        "Ceruleon" : "css/themes/cerulean/bootstrap.min.css",
        "Cosmo" : "css/themes/cosmo/bootstrap.min.css",
        "Cyborg" : "css/themes/cyborg/bootstrap.min.css",
        "Darkly" : "css/themes/darkly/bootstrap.min.css",
        "Flatly" : "css/themes/flatly/bootstrap.min.css",
        "Journal" : "css/themes/journal/bootstrap.min.css",
        "Litera" : "css/themes/litera/bootstrap.min.css",
        "Lumen" : "css/themes/lumen/bootstrap.min.css",
        "Lux" : "css/themes/lux/bootstrap.min.css",
        "Materia" : "css/themes/materia/bootstrap.min.css",
        "Minty" : "css/themes/minty/bootstrap.min.css",
        "Morph" : "css/themes/Morph/bootstrap.min.css",
        "Pulse" : "css/themes/pulse/bootstrap.min.css",
        "Quartz" : "css/themes/quartz/bootstrap.min.css",
        "Regent" : "css/themes/regent/bootstrap.min.css",
        "Sandstone" : "css/themes/sandstone/bootstrap.min.css",
        "Simplex" : "css/themes/simplex/bootstrap.min.css",
        "Sketchy" : "css/themes/sketchy/bootstrap.min.css",
        "Slate" : "css/themes/slate/bootstrap.min.css",
        "Solar" : "css/themes/solar/bootstrap.min.css",
        "Spacelab" : "css/themes/spacelab/bootstrap.min.css",
        "Superhero" : "css/themes/superhero/bootstrap.min.css",
        "United" : "css/themes/united/bootstrap.min.css",
        "Vapor" : "css/themes/vapor/bootstrap.min.css",
        "Yeti" : "css/themes/yeti/bootstrap.min.css",
        "Zephyr" : "css/themes/zephyr/bootstrap.min.css",
    };

    var profiles = $.jStorage.get(profilesKey, {});
    
    var checklist_totals = {};

    /// assure default values are set
    /// necessary 'cause we're abusing local storage to store JSON data
    /// done in a more verbose way to be easier to understand
    if (!('current' in profiles)) profiles.current = 'Default Profile';
    if (!(profilesKey in profiles)) profiles[profilesKey] = {};
    initializeProfile(profiles.current);

    window.onCheckbox = function(el) {
        var id = $(el).attr('id');
        var wasChecked = profiles[profilesKey][profiles.current].checklistData[id] === true;
        var isChecked = $(el).prop('checked');
        
        var total_span = $(el).closest('div[id$="Col"]').prev().children().get(2)
        var match = total_span.id.match(/(.*)_totals_(.*)/);
        var type = match[1];
        var i = parseInt(match[2]);
        var total_nav = $(total_span).closest('div').prevAll('nav').find('#' + type + '_nav_totals_' + i).get(0)
        var overall_total = $(total_nav).closest('nav').prevAll('h2').find('span[id$="overall_total"]').get(0)

        if (wasChecked === false && isChecked === true) {
            profiles[profilesKey][profiles.current].checklistData[id] = true;
            $(el).closest('li').addClass('completed');

            checklist_totals[total_span.id][0] += 1;
            checklist_totals[total_nav.id][0] += 1;
            checklist_totals[overall_total.id][0] += 1;
        } else if (wasChecked === true && isChecked === false) {
            delete profiles[profilesKey][profiles.current].checklistData[id];
            $(el).closest('li').removeClass('completed');
            
            checklist_totals[total_span.id][0] -= 1;
            checklist_totals[total_nav.id][0] -= 1;
            checklist_totals[overall_total.id][0] -= 1;
        } else if (wasChecked === true && isChecked === true) {
            // We are in setup. We just cleared all checkboxes and are going through 1 by 1 clicking them. That is why both the checkbox was just clicked and the saved data says it's clicked
            $(el).closest('li').addClass('completed');
            // No need to update totals it will be done soon.
            return;
        }

        if (checklist_totals[total_span.id][0] === checklist_totals[total_span.id][1]) {
            total_span.innerHTML = 'DONE';
            $(total_span).removeClass('in_progress').addClass('done').removeClass('bg-info').addClass('bg-success');
            $(total_span).parent('h3').addClass('completed');// Hide heading for completed category
        } else {
            total_span.innerHTML = checklist_totals[total_span.id][0] + '/' + checklist_totals[total_span.id][1];
            $(total_span).removeClass('done').addClass('in_progress').removeClass('bg-success').addClass('bg-info');
            $(total_span).parent('h3').removeClass('completed');// Show heading for not yet completed category
        }

        if (checklist_totals[total_nav.id][0] === checklist_totals[total_nav.id][1]) {
            total_nav.innerHTML = 'DONE';
            $(total_nav).removeClass('in_progress').addClass('done');
        } else {
            total_nav.innerHTML = checklist_totals[total_nav.id][0] + '/' + checklist_totals[total_nav.id][1];
            $(total_nav).removeClass('done').addClass('in_progress');
        }

        if (checklist_totals[overall_total.id][0] === checklist_totals[overall_total.id][1]) {
            overall_total.innerHTML = 'DONE';
            $(overall_total).removeClass('in_progress').addClass('done');
        } else {
            overall_total.innerHTML = checklist_totals[overall_total.id][0] + '/' + checklist_totals[overall_total.id][1];
            $(overall_total).removeClass('done').addClass('in_progress');
        }
        $.jStorage.set(profilesKey, profiles);
    };

    jQuery(document).ready(function($) {
        // Get the right style going...
        // themeSetup(buildThemeSelection());

        $('ul li[data-id]').each(function() {
            if (profiles[profilesKey][profiles.current].checklistData[$(this).attr('data-id')] === true) {
                $('#' + $(this).attr('data-id')).prop('checked', true);
                $(this).addClass('completed');
            }
        });

        // Open external links in new tab
        $("a[href^='http']").attr('target','_blank');

        populateProfiles();

        $('.checkbox input[type="checkbox"]').click(function() {
            window.onCheckbox(this)
        });

        $('div[data-id]').each(function() {
            var $el = $(this);
            if (profiles[profilesKey][profiles.current].checklistData[$el.attr('data-id')] === true) {
                $('#' + $el.attr('data-id')).prop('checked', true);
                $('div[data-id="' + $el.attr('data-id')+'"]').addClass('completed');
            }
        });

        $('.collapse-button').click(function(event) {
            var btn = $(event.currentTarget);
            var i = btn.children('i');
            if (btn.hasClass('collapsed')) {
                i.removeClass('bi-chevron-up');
                i.addClass('bi-chevron-down');
            } else {
                i.removeClass('bi-chevron-down');
                i.addClass('bi-chevron-up');
            }
            
        });

        $('.toc-button').click(function(event) {
            var btn = $(event.currentTarget);
            var i = btn.children(i);
            if (btn.hasClass('collapsed')) {
                i.removeClass('bi-dash');
                i.addClass('bi-plus-lg');
            } else {
                i.removeClass('bi-plus-lg');
                i.addClass('bi-dash');
            }
        });

        // Theme callback
        // $('#themes').change(function(event) {
        //     var stylesheet = $('#themes').val();
        //     themeSetup(stylesheet);
        //     profiles[profilesKey][profiles.current].style = stylesheet;
        //     $.jStorage.set(profilesKey, profiles);
        // });

        $('#profiles').change(function(event) {
            profiles.current = $(this).val();
            $.jStorage.set(profilesKey, profiles);

            $('li .checkbox .completed').show();

            populateChecklists();

            restoreState(profiles.current);

            calculateTotals();
        });

        $('#profileAdd').click(function() {
            $('#profileModalTitle').html('Add Profile');
            $('#profileModalName').val('');
            $('#profileModalAdd').show();
            $('#profileModalUpdate').hide();
            $('#profileModalDelete').hide();
            $('#profileModal').modal('show');
        });

        $('#profileEdit').click(function() {
            $('#profileModalTitle').html('Edit Profile');
            $('#profileModalName').val(profiles.current);
            $('#profileModalAdd').hide();
            $('#profileModalUpdate').show();
            if (canDelete()) {
                $('#profileModalDelete').show();
            } else {
                $('#profileModalDelete').hide();
            }
            $('#profileModal').modal('show');
        });

        $('#profileModalAdd').click(function(event) {
            event.preventDefault();
            var profile = $.trim($('#profileModalName').val());
            if (profile.length > 0) {
                initializeProfile(profile);

                profiles.current = profile;
                $.jStorage.set(profilesKey, profiles);
                populateProfiles();
                populateChecklists();
                restoreState(profiles.current);
            }
        });

        $('#profileModalUpdate').click(function(event) {
            event.preventDefault();
            var newName = $.trim($('#profileModalName').val());
            if (newName.length > 0 && newName != profiles.current) {
                profiles[profilesKey][newName] = profiles[profilesKey][profiles.current];
                delete profiles[profilesKey][profiles.current];
                profiles.current = newName;
                $.jStorage.set(profilesKey, profiles);
                populateProfiles();
            }
            $('#profileModal').modal('hide');
        });

        $('#profileModalDelete').click(function(event) {
            event.preventDefault();
            if (!canDelete()) {
                return;
            }
            if (!confirm('Are you sure?')) {
                return;
            }
            delete profiles[profilesKey][profiles.current];
            profiles.current = getFirstProfile();
            $.jStorage.set(profilesKey, profiles);
            populateProfiles();
            populateChecklists();
            restoreState(profiles.current);
            $('#profileModal').modal('hide');
        });

        $('#profileNG\\+').click(function() {
            $('#NG\\+Modal').modal('show');
        });

        $('#NG\\+ModalYes').click(function(event) {
            event.preventDefault();
            if (!confirm('Are you sure you wish to begin the next journey?')) {
                return;
            }
            $('[id^="playthrough_"], [id^="npc_quests_"], [id^="bosses_"], [id^="legacy_"], [id^="caves_"], [id^="evergaols_"], [id^="paintings"]').filter(':checked').each(function(){
                profiles[profilesKey][profiles.current].checklistData[this.id] = false;
            });
            if (profiles[profilesKey][profiles.current].journey < 3) {
                profiles[profilesKey][profiles.current].journey++;
            }
            $.jStorage.set(profilesKey, profiles);
            populateChecklists();
            restoreState(profiles.current);
            $('#NG\\+Modal').modal('hide');
        });

        $('#profileExport').click(function(){
            var filename = 'profiles.json';
            var text = JSON.stringify(profiles);
            if (window.Blob && window.navigator.msSaveBlob) {
                // Microsoft browsers (https://docs.microsoft.com/en-us/microsoft-edge/dev-guide/html5/file-api/blob)
                var blob = new window.Blob([text]);
                window.navigator.msSaveBlob(blob, filename);
            } else {
                // All other modern browsers
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        });

        $('#profileImport').click(function(){
          $('#fileInput').trigger('click');
        });
        /* Will reject if an incorrect file or no file is selected */
        $('input#fileInput').change(function(){
          var fileInput = document.getElementById('fileInput');
          if(!fileInput.files || !fileInput.files[0] || !/\.json$/.test(fileInput.files[0].name)){
            alert("Bad input file. File should end in .json")
            return;
          }
          var fr = new FileReader();
          fr.readAsText(fileInput.files[0]);
          fr.onload = dataLoadCallback;
        });

        /*
        *  Import & Export using textarea instead of files
        */
        $('#profileExportText').click(function(){
            document.getElementById("profileText").value = JSON.stringify(profiles);
            document.getElementById("profileText").select();
            document.execCommand("copy");
        });

        $('#profileImportText').click(function(){
            if (!confirm('Are you sure you want to import profile data?')) {
                return;
            }
            try {
                var jsonProfileData = JSON.parse(document.getElementById("profileText").value);
                profiles = jsonProfileData;
                $.jStorage.set(profilesKey, profiles);
                populateProfiles();
                populateChecklists();
                $('#profiles').trigger("change");
                location.reload();
            } catch(e) {
                alert(e); // error in the above string (in this case, yes)!
            }
        });

        $('input[id="toggleHideCompleted"]').change(function() {
            var hidden = !$(this).is(':checked');

            $(this).parent('div').parent('div').parent('.tab-content').toggleClass('hide_completed', !hidden);

            profiles[profilesKey][profiles.current].hide_completed = !hidden;
            $.jStorage.set(profilesKey, profiles);
        });

        $('.hide-buttons').click(function(event) {
            $('#btnHideCompleted').removeClass('show');
        });
        $('.show-buttons').click(function(event) {
            $('#btnHideCompleted').addClass('show');
        });

        $('[data-ng-toggle]').change(function() {
            var journey = $(this).data('ng-toggle');

            profiles[profilesKey][profiles.current].journey = +journey
            $.jStorage.set(profilesKey, profiles);

            toggleFilteredClasses('h_ng\\+');
            toggleFilteredClasses('s_ng\\+');
            toggleFilteredClasses('s_ng\\+\\+');

            calculateTotals();
        });


        $('[data-category-toggle]').change(function() {
            var to_hide = $(this).is(':checked');
            var item_toggles = $(this).closest('.btn-group.btn-group-vertical').find('[data-item-toggle]');

            // Change all child items to the same state as the category
            if (to_hide || (item_toggles.length === item_toggles.filter(':checked').length)) {
                item_toggles.not(function(){return this.checked === to_hide}).click();
            }
        });

        populateChecklists();
    });

    function initializeProfile(profile_name) {
        if (!(profile_name in profiles[profilesKey])) profiles[profilesKey][profile_name] = {};
        if (!('checklistData' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].checklistData = {};
        if (!('collapsed' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].collapsed = {};
        if (!('current_tab' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].current_tab = '#tabOptions';
        if (!('hide_completed' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].hide_completed = false;
        if (!('journey' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].journey = 1;
        if (!('style' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].style = 'Standard';
    }

    /// restore all saved state, except for the current tab
    /// used on page load or when switching profiles
    function restoreState(profile_name) {
        $('a[href$="Col"]').each(function() {
            var value = profiles[profilesKey][profile_name].collapsed[$(this).attr('href')];
            var active = $(this).hasClass('collapsed');

            // interesting note: this condition is the same as (value ^ active),
            // but there's no logical xor in JS as far as I know; also, this is more readable
            if ((value && !active) || (!value && active)) {
                $($(this).attr('href')).collapse('toggle');
            }
        });

        var $button = $("#toggleHideCompleted");
        var hide_completed_state = profiles[profilesKey][profile_name].hide_completed;
        var button_active = $button.is(':checked');
        if ((hide_completed_state && !button_active) || (!hide_completed_state && button_active)) {
            $button.click();
        }

        $('[data-ng-toggle="' + profiles[profilesKey][profile_name].journey + '"]').click().change();
        // themeSetup(profiles[profilesKey][profiles.current].style);
    }

    // Setup ("bootstrap", haha) styling
    function themeSetup(stylesheet) {
        if(stylesheet === null || stylesheet === undefined) { // if we didn't get a param, then
            stylesheet = profiles[profilesKey][profiles.current].style; // fall back on "light" if cookie not set
        }
        $("#bootstrap").attr("href", themes[stylesheet]);
    }

    function buildThemeSelection() {
        var style = profiles[profilesKey][profiles.current].style;
        var themeSelect = $("#themes");
        $.each(themes, function(key, value){
            themeSelect.append(
                $('<option></option>').val(key).html(key + " Theme")
            );
        });
        themeSelect.val(style);
        return style;
    }

    function dataLoadCallback(arg){
      var jsonProfileData = JSON.parse(arg.currentTarget.result);
      profiles = jsonProfileData;
      $.jStorage.set(profilesKey, profiles);
      populateProfiles();
      populateChecklists();
      $('#profiles').trigger("change");
      location.reload();
    }

    function populateProfiles() {
        $('#profiles').empty();
        $.each(profiles[profilesKey], function(index, value) {
            $('#profiles').append($("<option></option>").attr('value', index).text(index));
        });
        $('#profiles').val(profiles.current);
    }

    function populateChecklists() {
        $('.checkbox input[type="checkbox"]')
            .prop('checked', false)
            .closest('li')
            .removeClass('completed')
            .show();

        $.each(profiles[profilesKey][profiles.current].checklistData, function(index, value) {
            var el = $('#' + index);
            if (!el.prop('checked') && value === true) {
                el.click();
            }
        });

        calculateTotals();
    }

    function calculateTotals() {
        $('[id$="_overall_total"]').each(function(index) {
            var type = this.id.match(/(.*)_overall_total/)[1];
            var overallCount = 0, overallChecked = 0;
            $('[id^="' + type + '_totals_"]').each(function(index, el) {
                var regex = new RegExp(type + '_totals_(.*)');
                var i = parseInt(this.id.match(regex)[1]);
                var count = 0, checked = 0;
                $('div[id="' + type + '_' + i + 'Col"] input[id^="' + type + '"]').each(function(index, el) {
                    var checkbox = $(el);
                    count++;
                    overallCount++;
                    if (checkbox.prop('checked')) {
                        checked++;
                        overallChecked++;
                    }
                });
                checklist_totals[this.id] = [checked, count];
                checklist_totals[$(this).closest('div').prevAll('nav').find('#' + type + '_nav_totals_' + i).get(0).id] = [checked, count];
                if (checked === count) {
                    this.innerHTML = $(this).closest('div').prevAll('nav').find('#' + type + '_nav_totals_' + i).get(0).innerHTML = 'DONE';
                    $(this).removeClass('in_progress').addClass('done');
                    $(this).removeClass('bg-info').addClass('bg-success');
                    $(this).parent('h3').addClass('completed');// Hide heading for completed category
                    $($('#' + type + '_nav_totals_' + i)[0]).removeClass('in_progress').addClass('done');
                } else {
                    this.innerHTML = $(this).closest('div').prevAll('nav').find('#' + type + '_nav_totals_' + i).get(0).innerHTML = checked + '/' + count;
                    $(this).removeClass('done').addClass('in_progress');
                    $(this).removeClass('bg-success').addClass('bg-info');
                    $(this).parent('h3').removeClass('completed');// Show heading for not yet completed category
                    $($('#' + type + '_nav_totals_' + i)[0]).removeClass('done').addClass('in_progress');
                }
            });
            checklist_totals[this.id] = [overallChecked, overallCount];
            if (overallChecked === overallCount) {
                this.innerHTML = 'DONE';
                $(this).removeClass('in_progress').addClass('done');
            } else {
                this.innerHTML = overallChecked + '/' + overallCount;
                $(this).removeClass('done').addClass('in_progress');
            }
        // Update textarea for profile export
        document.getElementById("profileText").value = JSON.stringify(profiles);
        });
    }

    function canDelete() {
        var count = 0;
        $.each(profiles[profilesKey], function(index, value) {
            count++;
        });
        return (count > 1);
    }

    function getFirstProfile() {
        for (var profile in profiles[profilesKey]) {
            return profile;
        }
    }

    /*
     * -------------------------
     * Back to top functionality
     * -------------------------
     */
    $(function() {
        var offset = 220;
        var duration = 500;
        $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
                $('.fadingbutton').fadeIn(duration);
            } else {
                $('.fadingbutton').fadeOut(duration);
            }
        });

        $('.back-to-top').click(function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, duration);
            return false;
        });
    });

    /*
     * ------------------------------------------
     * Restore tabs/hidden sections functionality
     * ------------------------------------------
     */
     $(function() {
        // reset `Hide completed` button state (otherwise Chrome bugs out)
        $('#toggleHideCompleted').prop('checked', false);

        // restore collapsed state on page load
        restoreState(profiles.current);

        if (profiles[profilesKey][profiles.current].current_tab) {
            var tabId = profiles[profilesKey][profiles.current].current_tab; 
            var tab = $(tabId)
            tab.addClass('show')
            tab.addClass('active')
            var tabbtn = $('a[href^="' + profiles[profilesKey][profiles.current].current_tab + '"]')
            tabbtn.addClass('active')
            if (tabbtn.hasClass('dropdown-item')) {
                tabbtn.parent('li').parent('ul').prev('a').addClass('active')
            }
            if (tabId === "#tabMain" || tabId === "#tabOptions") {
                $('#btnHideCompleted').removeClass('show');
            } else {
                $('#btnHideCompleted').addClass('show');
            }
        }

        // register on click handlers to store state
        $('a[href$="Col"]').on('click', function(el) {
            var collapsed_key = $(this).attr('href');
            var saved_tab_state = !!profiles[profilesKey][profiles.current].collapsed[collapsed_key];

            profiles[profilesKey][profiles.current].collapsed[$(this).attr('href')] = !saved_tab_state;

            $.jStorage.set(profilesKey, profiles);
        });

        $('.nav.navbar-nav li a').on('click', function(event) {
            if ($(event.currentTarget).hasClass('dropdown-toggle')) {
                return;
            }
            profiles[profilesKey][profiles.current].current_tab = $(this).attr('href');
            
            window.scrollTo(0,0);

            $.jStorage.set(profilesKey, profiles);

            $('#nav-collapse').collapse('hide');
        });
     });

})( jQuery );

// to color the plus symbol in combined item pickups
$(".p").html('<a style="pointer-events:none">&nbsp;+ </a>');