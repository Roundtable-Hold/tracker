(function($) {
  'use strict';
  $(function() {
  var jets = [new Jets({
    searchTag: "#playthrough_search",
    contentTag: "#playthrough_list ul"
  }), new Jets({
    searchTag: "#quest_order_tldr_search",
    contentTag: "#quest_order_tldr_list ul"
  }), new Jets({
    searchTag: "#npc_quests_search",
    contentTag: "#npc_quests_list ul"
  }), new Jets({
    searchTag: "#achievements_search",
    contentTag: "#achievements_list ul"
  }), new Jets({
    searchTag: "#legendaries_search",
    contentTag: "#legendaries_list ul"
  }), new Jets({
    searchTag: "#bosses_search",
    contentTag: "#bosses_list ul"
  }), new Jets({
    searchTag: "#legacy_search",
    contentTag: "#legacy_list ul"
  }), new Jets({
    searchTag: "#caves_search",
    contentTag: "#caves_list ul"
  }), new Jets({
    searchTag: "#evergaols_search",
    contentTag: "#evergaols_list ul"
  }), new Jets({
    searchTag: "#illusory_walls_search",
    contentTag: "#illusory_walls_list ul"
  }), new Jets({
    searchTag: "#weapons_search",
    contentTag: "#weapons_list ul"
  }), new Jets({
    searchTag: "#armor_search",
    contentTag: "#armor_list ul"
  }), new Jets({
    searchTag: "#talismans_search",
    contentTag: "#talismans_list ul"
  }), new Jets({
    searchTag: "#incantations_search",
    contentTag: "#incantations_list ul"
  }), new Jets({
    searchTag: "#sorceries_search",
    contentTag: "#sorceries_list ul"
  }), new Jets({
    searchTag: "#ashesofwar_search",
    contentTag: "#ashesofwar_list ul"
  }), new Jets({
    searchTag: "#spirit_ashes_search",
    contentTag: "#spirit_ashes_list ul"
  }), new Jets({
    searchTag: "#flasks_search",
    contentTag: "#flasks_list ul"
  }), new Jets({
    searchTag: "#crystal_tears_search",
    contentTag: "#crystal_tears_list ul"
  }), new Jets({
    searchTag: "#memory_stones_talisman_pouches_search",
    contentTag: "#memory_stones_talisman_pouches_list ul"
  }), new Jets({
    searchTag: "#scrolls_prayerbooks_search",
    contentTag: "#scrolls_prayerbooks_list ul"
  }), new Jets({
    searchTag: "#whetstones_search",
    contentTag: "#whetstones_list ul"
  }), new Jets({
    searchTag: "#bell_bearings_search",
    contentTag: "#bell_bearings_list ul"
  }), new Jets({
    searchTag: "#cookbooks_search",
    contentTag: "#cookbooks_list ul"
  }), new Jets({
    searchTag: "#ancient_dragon_smithing_stones_search",
    contentTag: "#ancient_dragon_smithing_stones_list ul"
  }), new Jets({
    searchTag: "#remembrances_mausoleums_search",
    contentTag: "#remembrances_mausoleums_list ul"
  }), new Jets({
    searchTag: "#great_runes_search",
    contentTag: "#great_runes_list ul"
  }), new Jets({
    searchTag: "#dragon_hearts_death_roots_search",
    contentTag: "#dragon_hearts_death_roots_list ul"
  }), new Jets({
    searchTag: "#paintings_search",
    contentTag: "#paintings_list ul"
  }), new Jets({
    searchTag: "#pots_bottles_search",
    contentTag: "#pots_bottles_list ul"
  }), new Jets({
    searchTag: "#gestures_search",
    contentTag: "#gestures_list ul"
})];
  $("#playthrough_search").keyup(function() {
    $("#playthrough_list").unhighlight();
    $("#playthrough_list").highlight($(this).val());
  });
  $("#quest_order_tldr_search").keyup(function() {
    $("#quest_order_tldr_list").unhighlight();
    $("#quest_order_tldr_list").highlight($(this).val());
  });
  $("#npc_quests_search").keyup(function() {
    $("#npc_quests_list").unhighlight();
    $("#npc_quests_list").highlight($(this).val());
  });
  $("#achievements_search").keyup(function() {
    $("#achievements_list").unhighlight();
    $("#achievements_list").highlight($(this).val());
  });
  $("#legendaries_search").keyup(function() {
    $("#legendaries_list").unhighlight();
    $("#legendaries_list").highlight($(this).val());
  });
  $("#bosses_search").keyup(function() {
    $("#bosses_list").unhighlight();
    $("#bosses_list").highlight($(this).val());
  });
  $("#legacy_search").keyup(function() {
    $("#legacy_list").unhighlight();
    $("#legacy_list").highlight($(this).val());
  });
  $("#caves_search").keyup(function() {
    $("#caves_list").unhighlight();
    $("#caves_list").highlight($(this).val());
  });
  $("#evergaols_search").keyup(function() {
    $("#evergaols_list").unhighlight();
    $("#evergaols_list").highlight($(this).val());
  });
  $("#illusory_walls_search").keyup(function() {
    $("#illusory_walls_list").unhighlight();
    $("#illusory_walls_list").highlight($(this).val());
  });
  $("#weapons_search").keyup(function() {
    $("#weapons_list").unhighlight();
    $("#weapons_list").highlight($(this).val());
  });
  $("#armor_search").keyup(function() {
    $("#armor_list").unhighlight();
    $("#armor_list").highlight($(this).val());
  });
  $("#talismans_search").keyup(function() {
    $("#talismans_list").unhighlight();
    $("#talismans_list").highlight($(this).val());
  });
  $("#incantations_search").keyup(function() {
    $("#incantations_list").unhighlight();
    $("#incantations_list").highlight($(this).val());
  });
  $("#sorceries_search").keyup(function() {
    $("#sorceries_list").unhighlight();
    $("#sorceries_list").highlight($(this).val());
  });
  $("#ashesofwar_search").keyup(function() {
    $("#ashesofwar_list").unhighlight();
    $("#ashesofwar_list").highlight($(this).val());
  });
  $("#spirit_ashes_search").keyup(function() {
    $("#spirit_ashes_list").unhighlight();
    $("#spirit_ashes_list").highlight($(this).val());
  });
  $("#flasks_search").keyup(function() {
    $("#flasks_list").unhighlight();
    $("#flasks_list").highlight($(this).val());
  });
  $("#crystal_tears_search").keyup(function() {
    $("#crystal_tears_list").unhighlight();
    $("#crystal_tears_list").highlight($(this).val());
  });
  $("#memory_stones_talisman_pouches_search").keyup(function() {
    $("#memory_stones_talisman_pouches_list").unhighlight();
    $("#memory_stones_talisman_pouches_list").highlight($(this).val());
  });
  $("#scrolls_prayerbooks_search").keyup(function() {
    $("#scrolls_prayerbooks_list").unhighlight();
    $("#scrolls_prayerbooks_list").highlight($(this).val());
  });
  $("#whetstones_search").keyup(function() {
    $("#whetstones_list").unhighlight();
    $("#whetstones_list").highlight($(this).val());
  });
  $("#bell_bearings_search").keyup(function() {
    $("#bell_bearings_list").unhighlight();
    $("#bell_bearings_list").highlight($(this).val());
  });
  $("#cookbooks_search").keyup(function() {
    $("#cookbooks_list").unhighlight();
    $("#cookbooks_list").highlight($(this).val());
  });
  $("#ancient_dragon_smithing_stones_search").keyup(function() {
    $("#ancient_dragon_smithing_stones_list").unhighlight();
    $("#ancient_dragon_smithing_stones_list").highlight($(this).val());
  });
  $("#remembrances_mausoleums_search").keyup(function() {
    $("#remembrances_mausoleums_list").unhighlight();
    $("#remembrances_mausoleums_list").highlight($(this).val());
  });
  $("#great_runes_search").keyup(function() {
    $("#great_runes_list").unhighlight();
    $("#great_runes_list").highlight($(this).val());
  });
  $("#dragon_hearts_death_roots_search").keyup(function() {
    $("#dragon_hearts_death_roots_list").unhighlight();
    $("#dragon_hearts_death_roots_list").highlight($(this).val());
  });
  $("#paintings_search").keyup(function() {
    $("#paintings_list").unhighlight();
    $("#paintings_list").highlight($(this).val());
  });
  $("#pots_bottles_search").keyup(function() {
    $("#pots_bottles_list").unhighlight();
    $("#pots_bottles_list").highlight($(this).val());
  });
  $("#gestures_search").keyup(function() {
    $("#gestures_list").unhighlight();
    $("#gestures_list").highlight($(this).val());
  });
});
})( jQuery );
