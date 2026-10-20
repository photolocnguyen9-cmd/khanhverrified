import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import './phone-input.css';

const PhoneInput = ({ value, onChange, error, id, name, forceCountry }) => {
    const inputRef = useRef(null);
    const itiRef = useRef(null);
    const isUpdatingRef = useRef(false);

    useEffect(() => {
        const inputElement = inputRef.current;

        if (inputElement && !itiRef.current) {
            itiRef.current = intlTelInput(inputElement, {
                initialCountry: forceCountry || 'auto',
                geoIpLookup: (callback) => {
                    if (forceCountry) {
                        callback(forceCountry);
                        return;
                    }

                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 5000);

                    // ipapi.co hỗ trợ CORS tốt, thêm timestamp để tránh cache
                    const url = `https://ipapi.co/json/?t=${Date.now()}`;

                    fetch(url, {
                        signal: controller.signal,
                        cache: 'no-store',
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                        .then((res) => {
                            clearTimeout(timeoutId);
                            if (!res.ok) {
                                throw new Error(`HTTP ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            const countryCode = data.country_code?.toLowerCase();
                            
                            if (countryCode && countryCode.length === 2) {
                                callback(countryCode);
                            } else {
                                callback('vn');
                            }
                        })
                        .catch(() => {
                            clearTimeout(timeoutId);
                            callback('vn');
                        });
                },
                utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@25.13.2/build/js/utils.js',
                preferredCountries: ['vn', 'us', 'gb'],
                separateDialCode: true,
                nationalMode: true,
                formatOnDisplay: true,
                autoPlaceholder: 'aggressive',
                placeholderNumberType: 'MOBILE',
                customContainer: 'w-100',
                strictMode: false,
                autoHideDialCode: false
            });

            const handleChange = () => {
                if (itiRef.current && !isUpdatingRef.current) {
                    isUpdatingRef.current = true;
                    const fullNumber = itiRef.current.getNumber();
                    const selectedCountryData = itiRef.current.getSelectedCountryData();
                    const dialCode = selectedCountryData.dialCode;

                    if (fullNumber) {
                        onChange(fullNumber);
                    } else if (inputElement.value && dialCode) {
                        onChange(`+${dialCode}${inputElement.value.replace(/\D/g, '')}`);
                    } else {
                        onChange(inputElement.value);
                    }

                    setTimeout(() => {
                        isUpdatingRef.current = false;
                    }, 0);
                }
            };

            inputElement.addEventListener('input', handleChange);
            inputElement.addEventListener('countrychange', handleChange);

            return () => {
                if (inputElement) {
                    inputElement.removeEventListener('input', handleChange);
                    inputElement.removeEventListener('countrychange', handleChange);
                }
                if (itiRef.current) {
                    itiRef.current.destroy();
                    itiRef.current = null;
                }
            };
        }
    }, []);

    useEffect(() => {
        if (itiRef.current && value && !isUpdatingRef.current) {
            isUpdatingRef.current = true;
            itiRef.current.setNumber(value);
            isUpdatingRef.current = false;
        }
    }, [value]);

    return (
        <div className="intl-tel-input-wrapper">
            <input
                ref={inputRef}
                type="tel"
                id={id}
                name={name}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                required
            />
        </div>
    );
};

PhoneInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    forceCountry: PropTypes.string
};

export default PhoneInput;
