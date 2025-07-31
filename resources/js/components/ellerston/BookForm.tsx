
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useState } from 'react';
import { button_style, feild_class, gap24, h1_class, h3_class, label_full, mb24 } from './CssClasses';
import Footer from './Footer';
import ReactFlagsSelect from 'react-flags-select';
import Select from 'react-select';
import { sharedSelectStyles } from './SelectStyle';

gsap.registerPlugin(ScrollTrigger);

type Props = {
    onSuccess: () => void;
};

const selectgroupsize = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13+', label: '13+' },
];

function BookForm({ onSuccess }: Props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        code: 'US',
        telephone_number: '',
        groupsize: '',
        referred_by: '',
        acceptPolicy: false,
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline();
                tl.fromTo(
                    '.form_bg',
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: 0.1,
                    },
                );

                tl.fromTo(
                    '.bg-black-light',
                    { y: '-105%', opacity: 0 },
                    {
                        y: '0%',
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                );


                gsap.utils.toArray<HTMLElement>('.fade-effect').forEach((box) => {
                    tl.fromTo(
                        box,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.2,
                            ease: 'power3.out',
                        },
                    );
                });

                ScrollTrigger.create({
                    trigger: '.book-form-content',
                    // start: 'top+=100 center',
                    start: 'top 5%',
                    // end: '+=5%',
                    end: "bottom 80%",
                    animation: tl,
                    toggleActions: 'restart none restart none',
                    invalidateOnRefresh: true,
                    markers: false,
                    onEnter: () =>
                        gsap.to('.book-form-content', {
                            opacity: 1,
                            duration: 0.4,
                            ease: 'power2.out',
                        }),
                    onLeave: () =>
                        gsap.to('.book-form-content', {
                            opacity: 0,
                            duration: 0.4,
                            ease: 'power2.in',
                        }),
                    onLeaveBack: () =>
                        gsap.to('.book-form-content', {
                            opacity: 0,
                            duration: 0.4,
                            ease: 'power2.in',
                        }),
                    onEnterBack: () =>
                        gsap.to('.book-form-content', {
                            opacity: 1,
                            duration: 0.4,
                            ease: 'power2.out',
                        }),
                });

                ScrollTrigger.refresh();
            });
            return () => {
                ctx.revert();
            };
        }, 50);
        return () => {
            clearTimeout(timeout);
            // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.acceptPolicy) {
            alert('You must accept the Terms and Conditions to submit the form.');
            return;
        }

        console.log('Posting data:', formData);
        onSuccess();
    };

    return (
        <section id="book_form" className="form_wrap section w-full items-center bg-black">
            <div className="book-form-content relative px-[22px] py-[144px]">
                <div className="form_bg absolute top-0 left-0 z-0 h-full w-full"></div>

                <div className="relative z-10 mx-auto max-w-[856px] px-[24px] py-[64px] sm:px-[30px] sm:py-[70px] md:px-[50px] md:py-[80px] lg:px-[90px] lg:py-[100px] xl:px-[110px] xl:py-[120px]">

                    <span className="bg-black-light"></span>

                    {/* <span className="bg-black-light absolute inset-0 z-[-1]"></span> */}

                    <div className="px-[16px]">
                        <h1 className={h1_class + ' fade-effect mb-[24px] text-center'}>ELLERSTON GOLF</h1>
                        <h3 className={h3_class + ' fade-effect mb-[24px] text-center'}>
                            To arrange your visit to Ellerston, please fill out your details below and the team will be in touch.
                        </h3>

                    </div>

                    <form onSubmit={handleSubmit} className="fromstyle">
                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label htmlFor="name" className={label_full}>NAME</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="ENTER YOUR NAME"
                                className={feild_class}
                            />
                        </div>

                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label htmlFor="email" className={label_full}>EMAIL</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ENTER YOUR EMAIL ADDRESS"
                                className={feild_class}
                            />
                        </div>

                        <div className={`${mb24} ${gap24} fade-effect relative z-30 flex justify-center items-center`}>
                            <div className="w-[97px] flex flex-col justify-end">
                                <label htmlFor="code" className={label_full}>
                                    Code
                                </label>
                                <div className="h-[44px]"> {/* Adjust height to match your input field */}
                                    <ReactFlagsSelect
                                        className="country_drop"
                                        selected={formData.code}
                                        onSelect={(code) =>
                                            setFormData((prev) => ({ ...prev, code }))
                                        }
                                        customLabels={{
                                            US: { primary: '(United States)', secondary: '+1' },
                                            GB: { primary: '(United Kingdom)', secondary: '+44' },
                                            IN: { primary: '(India)', secondary: '+91' },
                                            AU: { primary: '(Austrlia)', secondary: '+61' },
                                            AF: { primary: '(Afghanistan)', secondary: '+93' },
                                            AL: { primary: '(Albania)', secondary: '+355' },
                                            DZ: { primary: '(Algeria)', secondary: '+61' },
                                            AS: { primary: '(American Samoa)', secondary: '+1684' },
                                            AD: { primary: '(Amndorra)', secondary: '+376' },
                                            AX: { primary: '(Åland Islands)', secondary: '+358 18' },
                                            AO: { primary: '(Angola)', secondary: '+244' },
                                            AI: { primary: '(Anguilla)', secondary: '+1264' },
                                            AG: { primary: '(Antigua and Barbuda)', secondary: '+1268' },
                                            AR: { primary: '(Argentina)', secondary: '+54' },
                                            AM: { primary: '(Armenia)', secondary: '+374' },
                                            AW: { primary: '(Aruba)', secondary: '+297' },
                                            AT: { primary: '(Austria)', secondary: '+43' },
                                            AZ: { primary: '(Azerbaijan)', secondary: '+994' },
                                            BS: { primary: '(Bahamas)', secondary: '+1242' },
                                            BH: { primary: '(Bahrain)', secondary: '+973' },
                                            BD: { primary: '(Bangladesh)', secondary: '+880' },
                                            BB: { primary: '(Barbados)', secondary: '+1 246' },
                                            BY: { primary: '(Belarus)', secondary: '+375' },
                                            BE: { primary: '(Belgium)', secondary: '+32' },
                                            BZ: { primary: '(Belize)', secondary: '+501' },
                                            BJ: { primary: '(Benin)', secondary: '+229' },
                                            BM: { primary: '(Bermuda)', secondary: '+1 441' },
                                            BT: { primary: '(Bhutan)', secondary: '+975' },
                                            BO: { primary: '(Bolivia)', secondary: '+591' },
                                            BA: { primary: '(Bosnia and Herzegovina)', secondary: '+387' },
                                            BW: { primary: '(Botswana)', secondary: '+267' },
                                            BR: { primary: '(Brazil)', secondary: '+55' },
                                            IO: { primary: '(British Indian Ocean)', secondary: '+246' },
                                            BG: { primary: '(Bulgaria)', secondary: '+359' },
                                            BF: { primary: '(Burkina Faso)', secondary: '+226' },
                                            BI: { primary: '(Burundi)', secondary: '+257' },
                                            KH: { primary: '(Cambodia)', secondary: '+855' },
                                            CM: { primary: '(Cameroon)', secondary: '+237' },
                                            CA: { primary: '(Canada)', secondary: '+1' },
                                            CV: { primary: '(Cape Verde)', secondary: '+238' },
                                            KY: { primary: '(Cayman Islands)', secondary: '+1 345' },
                                            CF: { primary: '(Central African Republic)', secondary: '+236' },
                                            TD: { primary: '(Chad)', secondary: '+235' },
                                            CL: { primary: '(Chile)', secondary: '+56' },
                                            CN: { primary: '(China)', secondary: '+86' },
                                            CO: { primary: '(Colombia)', secondary: '+57' },
                                            KM: { primary: '(Comoros)', secondary: '+269' },
                                            CG: { primary: '(Congo)', secondary: '+242' },
                                            CD: { primary: '(Democratic Republic of the Congo)', secondary: '+243' },
                                            CK: { primary: '(Cook Islands)', secondary: '+682' },
                                            CR: { primary: '(Costa Rica)', secondary: '+506' },
                                            HR: { primary: '(Croatia)', secondary: '+385' },
                                            CU: { primary: '(Cuba)', secondary: '+53' },
                                            CW: { primary: '(Curaçao)', secondary: '+599' },
                                            CY: { primary: '(Cyprus)', secondary: '+357' },
                                            CZ: { primary: '(Czech Republic)', secondary: '+420' },
                                            DK: { primary: '(Denmark)', secondary: '+45' },
                                            DJ: { primary: '(Djibouti)', secondary: '+253' },
                                            DM: { primary: '(Dominica)', secondary: '+1 767' },
                                            DO: { primary: '(Dominican Republic)', secondary: '+1 809, 1 829, 1849' },
                                            EC: { primary: '(Ecuador)', secondary: '+593' },
                                            EG: { primary: '(Egypt)', secondary: '+20' },
                                            SV: { primary: '(El Salvador)', secondary: '+503' },
                                            GQ: { primary: '(Equatorial Guinea)', secondary: '+240' },
                                            ER: { primary: '(Eritrea)', secondary: '+291' },
                                            EE: { primary: '(Estonia)', secondary: '+372' },
                                            ET: { primary: '(Ethiopia)', secondary: '+251' },
                                            FK: { primary: '(Falkland Islands)', secondary: '+500' },
                                            FO: { primary: '(Faroe Islands)', secondary: '+298' },
                                            FJ: { primary: '(Fiji)', secondary: '+679' },
                                            FI: { primary: '(Finland)', secondary: '+358' },
                                            FR: { primary: '(France)', secondary: '+33' },
                                            PF: { primary: '(French Polynesia)', secondary: '+689' },
                                            GA: { primary: '(Gabon)', secondary: '+241' },
                                            GM: { primary: '(Gambia)', secondary: '+220' },
                                            GE: { primary: '(Georgia)', secondary: '+995' },
                                            DE: { primary: '(Germany)', secondary: '+49' },
                                            GH: { primary: '(Ghana)', secondary: '+233' },
                                            GI: { primary: '(Gibraltar)', secondary: '+350' },
                                            GR: { primary: '(Greece)', secondary: '+30' },
                                            GL: { primary: '(Greenland)', secondary: '+299' },
                                            GD: { primary: '(Grenada)', secondary: '+1 473' },
                                            GU: { primary: '(Guam)', secondary: '+1 671' },
                                            GT: { primary: '(Guatemala)', secondary: '+502' },
                                            GN: { primary: '(Guinea)', secondary: '+224' },
                                            GW: { primary: '(Guinea-Bissau)', secondary: '+245' },
                                            HT: { primary: '(Haiti)', secondary: '+509' },
                                            HN: { primary: '(Honduras)', secondary: '+504' },
                                            HK: { primary: '(Hong Kong)', secondary: '+852' },
                                            HU: { primary: '(Hungary)', secondary: '+36' },
                                            IS: { primary: '(Iceland)', secondary: '+354' },
                                            ID: { primary: '(Indonesia)', secondary: '+62' },
                                            IR: { primary: '(Iran)', secondary: '+98' },
                                            IQ: { primary: '(Iraq)', secondary: '+964' },
                                            IE: { primary: '(Ireland)', secondary: '+353' },
                                            IM: { primary: '(Isle of Man)', secondary: '+44' },
                                            IL: { primary: '(Israel)', secondary: '+972' },
                                            IT: { primary: '(Italy)', secondary: '+39' },
                                            JM: { primary: '(Jamaica)', secondary: '+1 876' },
                                            JP: { primary: '(Japan)', secondary: '+81' },
                                            JE: { primary: '(Jersey)', secondary: '+44' },
                                            JO: { primary: '(Jordan)', secondary: '+962' },
                                            KZ: { primary: '(Kazakhstan)', secondary: '+7' },
                                            KE: { primary: '(Kenya)', secondary: '+254' },
                                            KI: { primary: '(Kiribati)', secondary: '+686' },
                                            KW: { primary: '(Kuwait)', secondary: '+965' },
                                            KG: { primary: '(Kyrgyzstan)', secondary: '+996' },
                                            LA: { primary: '(Laos)', secondary: '+856' },
                                            LV: { primary: '(Latvia)', secondary: '+371' },
                                            LB: { primary: '(Lebanon)', secondary: '+961' },
                                            LS: { primary: '(Lesotho)', secondary: '+266' },
                                            LR: { primary: '(Liberia)', secondary: '+231' },
                                            LY: { primary: '(Libya)', secondary: '+218' },
                                            LI: { primary: '(Liechtenstein)', secondary: '+423' },
                                            LT: { primary: '(Lithuania)', secondary: '+370' },
                                            LU: { primary: '(Luxembourg)', secondary: '+352' },
                                            MO: { primary: '(Macau)', secondary: '+853' },
                                            MK: { primary: '(Macedonia)', secondary: '+389' },
                                            MG: { primary: '(Madagascar)', secondary: '+261' },
                                            MW: { primary: '(Malawi)', secondary: '+265' },
                                            MY: { primary: '(Malaysia)', secondary: '+60' },
                                            ML: { primary: '(Mali)', secondary: '+960' },
                                            MT: { primary: '(Malta)', secondary: '+356' },
                                            MH: { primary: '(Marshall Islands)', secondary: '+692' },
                                            MV: { primary: '(Maldives)', secondary: '+960' },
                                            MQ: { primary: '(Martinique)', secondary: '+596' },
                                            MR: { primary: '(Mauritania)', secondary: '+222' },
                                            MU: { primary: '(Mauritius)', secondary: '+230' },
                                            YT: { primary: '(Mayotte)', secondary: '+262' },
                                            MX: { primary: '(Mexico)', secondary: '+52' },
                                            FM: { primary: '(Micronesia)', secondary: '+691' },
                                            MD: { primary: '(Moldova)', secondary: '+373' },
                                            MC: { primary: '(Monaco)', secondary: '+377' },
                                            MN: { primary: '(Mongolia)', secondary: '+976' },
                                            ME: { primary: '(Montenegro)', secondary: '+382' },
                                            MS: { primary: '(Montserrat)', secondary: '+1 664' },
                                            MA: { primary: '(Morocco)', secondary: '+212' },
                                            MZ: { primary: '(Mozambique)', secondary: '+258' },
                                            MM: { primary: '(Myanmar)', secondary: '+95' },
                                            NA: { primary: '(Namibia)', secondary: '+264' },
                                            NR: { primary: '(Nauru)', secondary: '+674' },
                                            NP: { primary: '(Nepal)', secondary: '+977' },
                                            NL: { primary: '(Netherlands)', secondary: '+31' },
                                            NZ: { primary: '(New Zealand)', secondary: '+64' },
                                            NI: { primary: '(Nicaragua)', secondary: '+505' },
                                            NE: { primary: '(Niger)', secondary: '+227' },
                                            NG: { primary: '(Nigeria)', secondary: '+234' },
                                            NU: { primary: '(Niue)', secondary: '+684' },
                                            NF: { primary: '(Norfolk Island)', secondary: '+672' },
                                            KP: { primary: '(North Korea)', secondary: '+850' },
                                            NO: { primary: '(Norway)', secondary: '+47' },
                                            OM: { primary: '(Oman)', secondary: '+968' },
                                            PK: { primary: '(Pakistan)', secondary: '+92' },
                                            PW: { primary: '(Palau)', secondary: '+680' },
                                            PS: { primary: '(Palestine)', secondary: '+970' },
                                            PA: { primary: '(Panama)', secondary: '+507' },
                                            PG: { primary: '(Papua New Guinea)', secondary: '+675' },
                                            PY: { primary: '(Paraguay)', secondary: '+595' },
                                            PE: { primary: '(Peru)', secondary: '+51' },
                                            PH: { primary: '(Philippines)', secondary: '+63' },
                                            PN: { primary: '(Pitcairn Islands)', secondary: '+870' },
                                            PL: { primary: '(Poland)', secondary: '+48' },
                                            PT: { primary: '(Portugal)', secondary: '+351' },
                                            PR: { primary: '(Puerto Rico)', secondary: '+1 787' },
                                            QA: { primary: '(Qatar)', secondary: '+974' },
                                            RO: { primary: '(Romania)', secondary: '+40' },
                                            RU: { primary: '(Russia)', secondary: '+7' },
                                            RW: { primary: '(Rwanda)', secondary: '+250' },
                                            KN: { primary: '(Saint Kitts and Nevis)', secondary: '+1 869' },
                                            LC: { primary: '(Saint Lucia)', secondary: '+1 758' },
                                            WS: { primary: '(Samoa)', secondary: '+685' },
                                            SM: { primary: '(San Marino)', secondary: '+378' },
                                            ST: { primary: '(Sao Tome and Principe)', secondary: '+239' },
                                            SA: { primary: '(Saudi Arabia)', secondary: '+966' },
                                            SN: { primary: '(Senegal)', secondary: '+221' },
                                            RS: { primary: '(Serbia)', secondary: '+381' },
                                            SC: { primary: '(Seychelles)', secondary: '+248' },
                                            SL: { primary: '(Sierra Leone)', secondary: '+232' },
                                            SG: { primary: '(Singapore)', secondary: '+65' },
                                            SX: { primary: '(Sint Maarten)', secondary: '+1 721' },
                                            SK: { primary: '(Slovakia)', secondary: '+421' },
                                            SI: { primary: '(Slovenia)', secondary: '+386' },
                                            SB: { primary: '(Solomon Islands)', secondary: '+677' },
                                            SO: { primary: '(Somalia)', secondary: '+252' },
                                            ZA: { primary: '(South Africa)', secondary: '+27' },
                                            KR: { primary: '(South Korea)', secondary: '+82' },
                                            SS: { primary: '(South Sudan)', secondary: '+211' },
                                            ES: { primary: '(Spain)', secondary: '+34' },
                                            LK: { primary: '(Sri Lanka)', secondary: '+94' },
                                            SD: { primary: '(Sudan)', secondary: '+249' },
                                            SR: { primary: '(Suriname)', secondary: '+597' },
                                            SZ: { primary: '(Swaziland)', secondary: '+268' },
                                            SE: { primary: '(Sweden)', secondary: '+46' },
                                            CH: { primary: '(Switzerland)', secondary: '+41' },
                                            SY: { primary: '(Syria)', secondary: '+963' },
                                            TW: { primary: '(Taiwan)', secondary: '+886' },
                                            TJ: { primary: '(Tajikistan)', secondary: '+992' },
                                            TZ: { primary: '(Tanzania)', secondary: '+255' },
                                            TH: { primary: '(Thailand)', secondary: '+66' },
                                            TL: { primary: '(Timor-Leste)', secondary: '+670' },
                                            TG: { primary: '(Togo)', secondary: '+228' },
                                            TK: { primary: '(Tokelau)', secondary: '+690' },
                                            TO: { primary: '(Tonga)', secondary: '+676' },
                                            TT: { primary: '(Trinidad and Tobago)', secondary: '+1 868' },
                                            TN: { primary: '(Tunisia)', secondary: '+216' },
                                            TR: { primary: '(Turkey)', secondary: '+90' },
                                            TM: { primary: '(Turkmenistan)', secondary: '+993' },
                                            TC: { primary: '(Turks and Caicos Islands)', secondary: '+1 649' },
                                            TV: { primary: '(Tuvalu)', secondary: '+688' },
                                            UG: { primary: '(Uganda)', secondary: '+256' },
                                            UA: { primary: '(Ukraine)', secondary: '+380' },
                                            AE: { primary: '(United Arab Emirates)', secondary: '+971' },
                                            UY: { primary: '(Uruguay)', secondary: '+598' },
                                            VU: { primary: '(Vanuatu)', secondary: '+678' },
                                            VE: { primary: '(Venezuela)', secondary: '+58' },
                                            VN: { primary: '(Vietnam)', secondary: '+84' },
                                            VI: { primary: '(Virgin Islands)', secondary: '+1 340' },
                                            YE: { primary: '(Yemen)', secondary: '+967' },
                                            ZM: { primary: '(Zambia)', secondary: '+260' },
                                            ZW: { primary: '(Zimbabwe)', secondary: '+263' },
                                        }}
                                        searchable
                                        showSelectedLabel={false}
                                        showSecondarySelectedLabel={true}
                                        placeholder="Select Code"
                                    />
                                </div>
                            </div>

                            <div className="w-[calc(100%_-_97px)]">
                                <label htmlFor="telephone_number" className={label_full}>
                                    Telephone Number
                                </label>
                                <input
                                    type="tel"
                                    name="telephone_number"
                                    value={formData.telephone_number}
                                    onChange={handleChange}
                                    placeholder="ENTER NUMBER"
                                    className={feild_class}
                                />
                            </div>
                        </div>


                        <div
                            className={mb24 + ' fade-effect gap-[24px] z-20'}
                        >
                            <label htmlFor="group_size" className={label_full}>GROUP SIZE</label>
                            <Select
                                options={selectgroupsize}
                                name="groupsize"
                                onChange={(option) => setFormData((prev) => ({ ...prev, groupsize: option }))}
                                value={formData.groupsize}
                                className="custom-select rounded-lg"
                                placeholder="Please Select"
                                styles={sharedSelectStyles}
                            />

                        </div>

                        <div className={mb24 + ' fade-effect gap-[24px] z-0'}>
                            <label htmlFor="referred_by" className={label_full}>REFERRED BY</label>
                            <input
                                type="text"
                                name="referred_by"
                                value={formData.referred_by}
                                onChange={handleChange}
                                placeholder="ENTER NAME OR CODE"
                                className={feild_class}
                            />
                        </div>

                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label className="custom_checkbox">
                                <input
                                    type="checkbox"
                                    name="acceptPolicy"
                                    checked={formData.acceptPolicy}
                                    onChange={handleChange}
                                />
                                <span className="checkbox"></span>
                                <span className='tracking-wider'>
                                    By submitting this form, you agree to our Privacy Policy.{' '}
                                    <Link href="">Read Privacy Policy here</Link>
                                </span>
                            </label>
                        </div>

                        <div className="fade-effect pt-[24px] text-center">
                            <button type="submit" className={button_style + ' btn_arrow m-auto'}>
                                <span>
                                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                                        <path
                                            d="M12.8827 7.42301H0.923C0.799833 7.42301 0.6985 7.38335 0.619 7.30401C0.539667 7.22451 0.5 7.12309 0.5 6.99976C0.5 6.87643 0.539667 6.77509 0.619 6.69576C0.6985 6.61659 0.799833 6.57701 0.923 6.57701H12.8827L7.19675 0.903762C7.12408 0.821096 7.08275 0.723512 7.07275 0.611012C7.06275 0.498512 7.10475 0.397095 7.19875 0.306762C7.29275 0.210429 7.39317 0.161929 7.5 0.161262C7.60683 0.160595 7.70725 0.207261 7.80125 0.301261L13.99 6.49001C14.0642 6.56418 14.1204 6.64268 14.1587 6.72551C14.1969 6.80818 14.216 6.90026 14.216 7.00176C14.216 7.1031 14.1969 7.19459 14.1587 7.27626C14.1204 7.35793 14.0642 7.43584 13.99 7.51001L7.80125 13.6988C7.72142 13.7786 7.62542 13.8218 7.51325 13.8283C7.40092 13.8346 7.29608 13.7914 7.19875 13.6988C7.10475 13.6013 7.05775 13.4997 7.05775 13.394C7.05775 13.2882 7.10475 13.1925 7.19875 13.107L12.8827 7.42301Z"
                                            fill=""
                                        />
                                    </svg>
                                    Submit
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </section>
    );
}

export default BookForm;
