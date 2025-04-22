'use client';

import React from 'react';
import styles from './tabs.module.css';

interface TabsProps {
    defaultValue: string;
    className?: string;
    children: React.ReactNode;
}

interface TabsListProps {
    className?: string;
    children: React.ReactNode;
}

interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

const TabsContext = React.createContext<{
    value: string;
    setValue: (value: string) => void;
}>({ value: '', setValue: () => {} });

export function Tabs({ defaultValue, className, children }: TabsProps) {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <TabsContext.Provider value={{ value, setValue }}>
            <div className={`${styles.tabs} ${className || ''}`}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

export function TabsList({ className, children }: TabsListProps) {
    return (
        <div className={`${styles.tabsList} ${className || ''}`}>
            {children}
        </div>
    );
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
    const { value: selectedValue, setValue } = React.useContext(TabsContext);
    
    return (
        <button
            className={`${styles.tabsTrigger} ${selectedValue === value ? styles.selected : ''} ${className || ''}`}
            onClick={() => setValue(value)}
            type="button"
        >
            {children}
        </button>
    );
}

export function TabsContent({ value, children, className }: TabsContentProps) {
    const { value: selectedValue } = React.useContext(TabsContext);
    
    if (selectedValue !== value) return null;
    
    return (
        <div className={`${styles.tabsContent} ${className || ''}`}>
            {children}
        </div>
    );
}