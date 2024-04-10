'use client'
import React from 'react';
import {BsMoonFill, BsSunFill} from "react-icons/bs";

enum Theme {
    winter = 'winter',
    dracula = 'dracula',
}
const ThemeToggle = () => {
    const [theme, setTheme] = React.useState<string>(Theme.winter)
    const toggleTheme = () => {
        const newTheme = theme === Theme.winter ? Theme.dracula : Theme.winter;
        document.documentElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
    };
    return (
        <button onClick={toggleTheme} className='btn btn-sm btn-outline'>
            {theme === 'winter' ? (
                <BsMoonFill className='h-4 w-4'/>
            ) : (
                <BsSunFill className='h-4 w-4'/>
            )}
        </button>
    );
};

export default ThemeToggle;
