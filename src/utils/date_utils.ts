import isDate from "date-fns/isDate";
import isValidDate from "date-fns/isValid";
import format from "date-fns/format";
import addMinutes from "date-fns/addMinutes";
import addHours from "date-fns/addHours";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";
import addYears from "date-fns/addYears";
import subMinutes from "date-fns/subMinutes";
import subHours from "date-fns/subHours";
import subDays from "date-fns/subDays";
import subWeeks from "date-fns/subWeeks";
import subMonths from "date-fns/subMonths";
import subYears from "date-fns/subYears";
import getSeconds from "date-fns/getSeconds";
import getMinutes from "date-fns/getMinutes";
import getHours from "date-fns/getHours";
import getDay from "date-fns/getDay";
import getDate from "date-fns/getDate";
import getWeek from "date-fns/getWeek";
import getMonth from "date-fns/getMonth";
import getQuarter from "date-fns/getQuarter";
import getYear from "date-fns/getYear";
import getTime from "date-fns/getTime";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
// import setSeconds from "date-fns/setSeconds";
// import setMinutes from "date-fns/setMinutes";
// import setHours from "date-fns/setHours";
// import setMonth from "date-fns/setMonth";
// import setQuarter from "date-fns/setQuarter";
// import setYear from "date-fns/setYear";
// import min from "date-fns/min";
// import max from "date-fns/max";

export {
	getSeconds,
	getMinutes,
	getHours,
	getMonth,
	getQuarter,
	getYear,
	getDay,
	getWeek,
	getDate,
	getTime
};

// ** Date Math **
// *** Addition ***
export { addMinutes, addHours, addDays, addWeeks, addMonths, addYears };

// *** Subtraction ***
export { subMinutes, subHours, subDays, subWeeks, subMonths, subYears };

// ** Date Formatting **

export function formatDate(date: Date, formatStr: string, locale?: string) {
	if (locale === "en") {
		return format(date, formatStr);
	}
	return format(date, formatStr);
}

// ** Date Comparison **
export { isBefore, isAfter };

// ** Date "Reflection" **
export { isDate };

export function isValid(date: Date) {
  return isValidDate(date) && isAfter(date, new Date("1/1/1000"));
}
