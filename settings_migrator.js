const DefaultSettings = {
    // ----

    "Vanguard": true, 
    "VLog": false,
    "GQuestLog": false,
    "Guardian": false,
    "Daily": false,
    "battleground": [
        102,
        103, 
        110, 
        111, 
        112, 
        116, 
        117, 
        118, 
        119  
    ],
    "GQuest": true,

    // ----

    "enabled_auto_nostrum": true,
    "hide_duration": true,
    "hide_message": true,
    "keep_resurrection_invincibility": false,
    "dungeon_only": false,
    "civil_unrest": true,
    "interval": 50,
    "range": 500,
    "interval": 500,

    // ----

    "enabled_fps_script":       true,
    "remove_combat_info":       true,
    "remove_purple_hp_bar":     true,
    "remove_useless_info":      true,
    "remove_ally_hpbar":        true,
    "remove_companion_style":   true,


    //  ----

    
    "enabled_true_pot": true,
    "minThrottle": 20000,
    "hpCutoff": 85,
    "slCutoff": 85,
    "mpCutoff": 85,

    //  ----

    "enabled_raid_marker": true
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
    if (from_ver === undefined) {
        // Migrate legacy config file
        return Object.assign(Object.assign({}, DefaultSettings), settings);
    } else if (from_ver === null) {
        // No config file exists, use default settings
        return DefaultSettings;
    } else {
        // Migrate from older version (using the new system) to latest one
        if (from_ver + 1 < to_ver) { // Recursively upgrade in one-version steps
            settings = MigrateSettings(from_ver, from_ver + 1, settings);
            return MigrateSettings(from_ver + 1, to_ver, settings);
        }
        // If we reach this point it's guaranteed that from_ver === to_ver - 1, so we can implement
        // a switch for each version step that upgrades to the next version. This enables us to
        // upgrade from any version to the latest version without additional effort!
        switch (to_ver) {
            default:
                let oldsettings = settings
                settings = Object.assign(DefaultSettings, {});
                for (let option in oldsettings) {
                    if (settings[option]) {
                        settings[option] = oldsettings[option]
                    }
                }
                break;
        }
        return settings;
    }
}
