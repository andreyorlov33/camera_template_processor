on run
    tell application "Finder"
        tell application "Finder" to set script_file to (container of (path to me) as string) & "batchRunner.jsx" as string
    end tell
    try
        tell application "Adobe Photoshop CC 2017"
            activate
            do javascript(file script_file)
        end tell
        set output to true
        on error
            set output to false    
    end try
end run