import { Link } from '@inertiajs/react';
import { motion as m } from 'framer-motion';
import sitelogo from '../../assets/img/logo.svg';

import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { p_xs_class, px_72 } from './CssClasses';
import { scrollToTarget } from './utils/scrollToTarget';

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother);

function TopBar({ onShowContact, private_page }: { onShowContact: any, private_page: boolean }) {
    const menuRef = useRef(null);
    const menuItemsRef = useRef([]);
    const [isOpen, setIsOpen] = useState(false);
    const toggleButtonRef = useRef(null);

    const [isExpanded, setIsExpanded] = useState(false);
    // console.log(isOpen);

    const toggleMenu = useCallback(
        (e) => {
            if (e) e.preventDefault();
            setIsExpanded((prev) => !prev);
            const smoother = ScrollSmoother.get();
            if (isOpen) {
                smoother?.paused(false);
                gsap.to(menuRef.current, {
                    y: '-110%',
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        gsap.to(menuItemsRef.current, { opacity: 0, x: '-100%' });
                        gsap.to('.in_topbar', { background: '#0000', duration: 0.3 });
                        setIsOpen(false); // move here to avoid async glitches
                    },
                });
            } else {
                smoother?.paused(true);
                gsap.to('.in_topbar', {
                    background: '#000',
                    duration: 0.3,
                    onComplete: () => {
                        gsap.to(menuRef.current, {
                            y: '100%',
                            opacity: 1,
                            duration: 0.3,
                            ease: 'power3.out',
                            onComplete: () => {
                                gsap.fromTo(
                                    menuItemsRef.current,
                                    { opacity: 0, x: '-100%' },
                                    {
                                        opacity: 1,
                                        x: 0,
                                        duration: 0.4,
                                        stagger: 0.15,
                                        ease: 'power3.out',
                                    },
                                );
                                setIsOpen(true); // move here
                            },
                        });
                    },
                });
            }
        },
        [isOpen],
    );

    useLayoutEffect(() => {
        menuItemsRef.current = [];
    }, []);

    const setItemRef = (el, index) => {
        menuItemsRef.current[index] = el;
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                toggleButtonRef.current &&
                !toggleButtonRef.current.contains(e.target)
            ) {
                toggleMenu(e); // close the menu
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleMenu]);

    const menuLinks = [
        {
            label: 'Explore experiences',
            href: '#experience_wrap',
            onClick: (e) => {
                e.preventDefault();
                scrollToTarget('#experience_wrap', 0, () => toggleMenu(e));
            },
        },
        {
            label: 'View image gallery',
            href: '#',
            onClick: (e) => {
                e.preventDefault();
                toggleMenu(e); // close menu first
                onShowContact('imagegallery');
            },
        },
        {
            label: 'Register interest',
            href: '/',
            onClick: (e) => {
                e.preventDefault();
            },
        },
        /*{
            label: 'select language',
            href: '/',
            onClick: (e) => {
                e.preventDefault();
            },
        },
        {
            label: 'Privacy Policy',
            href: '/',
            onClick: (e) => {
                e.preventDefault();
            },
        },*/
    ];

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="top_bar fixed top-0 left-0 z-20 w-full"
        >
            <div className={px_72 + ' in_topbar relative z-20 flex items-center justify-between py-[24px]'}>
                <div className="logo w-[85px] sm:w-[100px]">
                    <img src={sitelogo} alt="" />
                </div>
                <div className="top_right">
                    <button className="menu-toggle flex sm:hidden" aria-expanded={isExpanded} onClick={toggleMenu}>
                        <span className="menu-text">Menu</span>
                    </button>
                    <ul className="m-0 hidden list-none p-0 sm:flex">
                        <li>
                            <Link href="#" ref={toggleButtonRef} onClick={toggleMenu} className="flex items-center gap-1.5">
                                {isOpen ? (
                                    <>
                                        <span>Close </span>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0.578154 12L0 11.4218L5.42209 6L0 0.578155L0.578154 0L6 5.42209L11.4218 0L12 0.578155L6.57791 6L12 11.4218L11.4218 12L6 6.57791L0.578154 12Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        <span>Menu</span>
                                    </>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div ref={menuRef} className={px_72 + ' absolute right-0 bottom-0 left-0 z-10 translate-y-[-110%] bg-black opacity-0'}>
                <ul className="menuItem m-0 my-[40px] list-none overflow-hidden pr-[24px]">
                    {menuLinks.map((item, i) => (
                        <li key={item.label} ref={(el) => setItemRef(el, i)} className="boder-l-[#fff] border-l-[0.5px] pl-[24px] opacity-0">
                            <Link
                                href={item.href}
                                className={p_xs_class + ' scroll-link inline-block px-[16px] py-[8px]'}
                                onClick={(e) => {
                                    if (typeof item.onClick === 'function') {
                                        item.onClick(e); // call custom handler
                                    }
                                    // Otherwise: allow default navigation
                                }}
                            >
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </m.div>
    );
}

export default TopBar;
