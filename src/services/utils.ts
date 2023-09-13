export {
	dateToDayOfMonth,
	dateToDayOfWeek,
	dateToMonth,
	extractTimeFromDate,
	monthToNumber
}

const dateToDayOfWeek = (date: Date | null): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
    };

    if (date) {
      const dayOfWeek = date.toLocaleDateString("fr-FR", options);
      return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    }
    return "";
  }

  const dateToDayOfMonth = (date: Date | null): number => {
	if (date) {
	  return date.getDate();
	}
	return 0;
  }
  
  const dateToMonth = (date: Date | null): string => {
	const options: Intl.DateTimeFormatOptions = {
	  month: "long",
	};
  
	if (date) {
	  const month = date.toLocaleDateString("fr-FR", options);
	  return month.charAt(0).toUpperCase() + month.slice(1);
	}
	return "";
  }

const monthToNumber = (month: string): number => {
	const monthMap: { [key: string]: number } = {
		"Janvier": 0,
		"Février": 1,
		"Mars": 2,
		"Avril": 3,
		"Mai": 4,
		"Juin": 5,
		"Juillet": 6,
		"Août": 7,
		"Septembre": 8,
		"Octobre": 9,
		"Novembre": 10,
		"Décembre": 11
	};

	return monthMap[month.charAt(0).toUpperCase() + month.slice(1)];
}
  
  const extractTimeFromDate = (date: Date | null): string => {
	if (date) {
		const timeString = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
		return timeString.substring(0, 5).replace(':', 'h');
	}
	return '';
  }