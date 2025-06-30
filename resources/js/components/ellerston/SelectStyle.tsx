import type { DropdownIndicatorProps, StylesConfig } from 'react-select';
import { components } from 'react-select';

export const sharedSelectStyles: StylesConfig = {
    control: (base, state) => ({
        ...base,
        textTransform: 'uppercase',
        letterSpacing: '1.2px',
        backgroundColor: 'transparent',
        borderColor: '#939191',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#939191',
        },
        borderRadius: '4px',
        padding: '6px 6px 6px 4px',
        minHeight: '40px',
        color: '#fff',
    }),

    singleValue: (base) => ({
        ...base,
        color: '#fff',
    }),

    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#000' : state.isFocused ? '#dfdfdf' : '#fff',
        color: state.isSelected ? '#fff' : '#333',
        padding: '5px 12px',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '12%',
    }),

    menu: (base) => ({
        ...base,
        borderRadius: '8px',
        marginTop: 0,
        zIndex: 20,
    }),

    dropdownIndicator: (base, state) => ({
        ...base,
        color: '#fff',
        '&:hover': {
            color: '#fff',
        },
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
        padding: '0 8px',
    }),

    indicatorSeparator: () => ({
        display: 'none',
    }),

    placeholder: (base) => ({
        ...base,
        color: '#B4B4B4',
        fontSize: '14px',
    }),
};

export const CustomDropdownIndicator = (props: DropdownIndicatorProps<any>) => (
    <components.DropdownIndicator {...props}>
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.99916 6.7082L0.691406 1.40045L1.29791 0.793945L5.99916 5.49545L10.7004 0.793945L11.3069 1.40045L5.99916 6.7082Z"
                fill="#B4B4B4"
            />
        </svg>
    </components.DropdownIndicator>
);
