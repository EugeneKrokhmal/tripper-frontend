import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define your translation resources here
const resources = {
  en: {
    translation: {
      "resetPassword": "Reset Password",
      "newPassword": "New Password",
      "resetPasswordError": "An error occurred while resetting your password. Please try again.",
      "forgotPasswordError": "An error occurred while requesting a password reset. Please try again.",
      upcomingTrips: "Upcoming Trips",
      pastTrips: "Past Trips",
      noUpcomingTrips: "No upcoming trips.",
      noPastTrips: "No past trips.",
      currencyConfirmationTitle: "Confirm Currency",
      othersOwe: "You get back",
      currencyConfirmationMessage: "Do you want to continue or change the currency? The current currency is set to: ",
      welcomeToTripper: "WELCOME TO TRIPPER",
      discoverAndPlan: "Discover and plan your perfect trip with Tripper! Organize your adventures with friends and family, split expenses, and create lifelong memories.",
      explore: "Explore",
      loading: "Loading...",
      myTrips: "My Trips",
      noTrips: "You are not part of any trips yet.",
      home: "Home",
      searchTrips: "Search Trips",
      YouAreAParticipant: "You are a Participant",
      View: "View",
      createTripTitle: "Where's Next?",
      tripName: "Trip Name",
      destination: "Destination",
      enterTripName: "Enter trip name",
      enterDestination: "Enter destination",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Description",
      enterDescription: "Enter description",
      createTrip: "Create Trip",
      tripCreated: "Trip created successfully!",
      endDateError: "End date cannot be before the start date.",
      locationNotFound: "Location not found",
      createTripError: "Failed to create trip.",
      currentWeather: "Current Weather",
      temperature: "Temperature",
      windSpeed: "Wind",
      openInMaps: "Open in Maps",
      noWeatherData: "No weather data available",
      loadingWeatherData: "Loading weather data...",
      failedToLoadWeather: "Failed to load weather data",
      theCrew: "The Crew",
      youAreTheOwnerOfTheTrip: "You are the owner of the trip",
      youAreAnAdminOfTheTrip: "You are an admin",
      tripDurationDay: "day",
      tripDurationDays: "days",
      thePlace: "The Place",
      discoverAmazingTrip: "Discover the amazing trip to",
      timeline: "Timeline",
      toAddActivity: "To add an activity, you should be an owner of the trip.",
      dayPlan: "day plan",
      noActivities: "No activities planned for this day.",
      addActivity: "Add Activity",
      showMore: "Show More",
      showLess: "Show Less",
      editActivity: "Edit Activity",
      editExpense: "Edit Expense",
      activityName: "Activity Name",
      activityDescription: "Activity Description",
      activityTime: "Activity Time",
      selectDate: "Select Date",
      updateActivity: "Update Activity",
      enterActivityName: "Enter activity name",
      enterActivityDescription: "Enter activity description",
      enterActivityTime: "Enter activity time",
      settlementSummary: "Settlements",
      settlementDescription: "Each row displays the debtor (person who owes money), the creditor (person to be paid), and the amount owed.",
      debtor: "Debtor",
      creditor: "Creditor",
      amount: "Amount",
      noSettlements: "No settlements to display",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      expensesLog: "Expenses Log",
      history: "History",
      responsible: "Responsible",
      whoPays: "Who Pays",
      involved: "Involved",
      addExpense: "Add Expense",
      pleaseEnterValidAmount: "Please enter a valid amount",
      failedToAddExpense: "Failed to add expense",
      addingExpense: "Adding Expense...",
      expenseName: "Expense Name",
      expenseDescription: "Expense description",
      specificSplit: "Specific split",
      splitAmong: "Split among",
      expenseFormInstructions: "To add an expense, fill in the expense name, amount, and choose the responsible participant. Select the split method (even or specific) and assign participants if needed.",
      expensesOverview: "Expenses Overview",
      youPaid: "You paid",
      totalTripCost: "Total trip cost",
      itCostsYou: "It costs you",
      inviteFriends: "Invite friends",
      invite: "Invite",
      ShareThisLinkToInviteOthersToThisTrip: "Share this link to invite others to this trip.",
      editTrip: "Edit trip",
      goBack: "Go back",
      next: "Next",
      planYourTrip: "Plan Your Trip",
      shareWithFriends: "Share With Friends",
      settings: "Settings",
      login: "Login",
      register: "Register",
      logout: "Sign out",
      rememberMe: "Remember me",
      forgotPassword: "Forgot Password?",
      email: "Email",
      password: "Password",
      dontHaveAnAccount: "Don't have an account?",
      alreadyHaveAnAccount: "Already have an account?",
      whyChooseTripper: "Why Choose Tripper?",
      organizedItineraries: "Organized Itineraries",
      organizedItinerariesDescription: "Plan your trips with ease by creating organized itineraries. Add destinations, accommodation, and activities to keep everything on track.",
      expenseSplitting: "Expense Splitting",
      expenseSplittingDescription: "Automatically split expenses between participants. You can set custom split methods or divide costs evenly, ensuring a fair experience.",
      realTimeSettlements: "Real-Time Settlements",
      realTimeSettlementsDescription: "Track who owes what in real-time. Our automated settlement system makes sure everyone pays their fair share during and after the trip.",
      simplifyGroupTravel: "Simplify Group Travel with Tripper",
      simplifyGroupTravelDescription: "Tripper helps you plan, track expenses, and split costs effortlessly for group trips. Whether it's a weekend getaway or a business trip, we make sure everything stays organized and fair.",
      expenses: "Expenses",
      settleDebt: "Settle Debt",
      settlementType: "Settlement type",
      settle: "Settle",
      settled: "Settled",
      cash: "Cash",
      name: "Name",
      loginError: "An error occurred during login. Please try again.",
      signInError: "An error occurred during registration.",
      remainingOwedToYou: "Owed to you",
      pageNotFound: "Page Not Found",
      goBackHome: "Go Back Home",
      uploadConfirmation: "Upload confirmation",
      reportBug: "If you found a bug, please report it",
      testMode: "This app is in test mode",
      viewBooking: "View Booking",
      bookingLink: "Booking link",
      faq: {
        title: "Frequently Asked Questions",
        generalQuestions: {
          title: "General Questions",
          q1: "What is this platform about?",
          a1: "This platform is designed to make group expenses and settlements easy...",
          q2: "How do I create a new trip or event?",
          a2: "To create a new trip, simply click on the “Create Trip” button on your dashboard...",
          q3: "Can I invite others to join my trip?",
          a3: "Yes! You can generate a unique join link for each trip..."
        },
        expensesAndSettlements: {
          title: "Expenses & Settlements",
          q1: "How do I add an expense?",
          a1: "Inside each trip, you’ll find an “Add Expense” button...",
          q2: "How is the expense split among participants?",
          a2: "When adding an expense, you can choose between splitting it evenly...",
          q3: "What does “settling an expense” mean?",
          a3: "Settling an expense means recording that a participant has paid back..."
        },
        paymentsAndFairShare: {
          title: "Payments & Fair Share",
          q1: "What is “Fair Share”?",
          a1: "Fair Share is the amount each participant should ideally pay...",
          q2: "Can I view a history of settled debts?",
          a2: "Yes, settled debts are saved in the system for reference and tracking...",
          q3: "How do I mark an expense as settled?",
          a3: "In the settlements section, click on a particular debt..."
        },
        accountAndPrivacy: {
          title: "Account & Privacy",
          q1: "Is my data private?",
          a1: "Absolutely. We prioritize user privacy...",
          q2: "Can I delete my account?",
          a2: "Yes, you may delete your account from the account settings...",
          q3: "Can I remove participants from a trip?",
          a3: "Only the trip owner can remove participants..."
        },
        technicalSupport: {
          title: "Technical Support",
          q1: "What should I do if I encounter a bug?",
          a1: "Please report any bugs by contacting support...",
          q2: "How do I reset my password?",
          a2: "Go to the account login page and click on 'Forgot Password'...",
          q3: "Is there a mobile version of this app?",
          a3: "Our app is designed to be fully responsive..."
        }
      }
    },
  },
  uk: {
    translation: {
      "resetPassword": "Скинути пароль",
      "newPassword": "Новий пароль",
      "resetPasswordError": "Виникла помилка під час скидання пароля. Спробуйте ще раз.",
      "forgotPasswordError": "Виникла помилка під час запиту на скидання пароля. Спробуйте ще раз.",
      upcomingTrips: "Майбутні подорожі",
      pastTrips: "Минулі подорожі",
      noUpcomingTrips: "Немає майбутніх подорожей.",
      noPastTrips: "Немає минулих подорожей.",
      currencyConfirmationTitle: "Підтвердьте валюту",
      othersOwe: "Ви отримаєте",
      currencyConfirmationMessage: "Бажаєте продовжити чи змінити валюту? Поточна валюта встановлена як: ",
      uploadConfirmation: "Додайте підтвердження",
      welcomeToTripper: "ЛАСКАВО ПРОСИМО ДО TRIPPER",
      discoverAndPlan: "Відкрийте для себе і сплануйте свою ідеальну подорож з Tripper! Організуйте свої пригоди з друзями та родиною, розподіліть витрати і створіть спогади на все життя.",
      createTrip: "Створити Подорож",
      explore: "Досліджуйте",
      loading: "Завантаження...",
      myTrips: "Мої подорожі",
      noTrips: "Ви ще не є учасником жодної подорожі.",
      home: "Домашня",
      searchTrips: "Пошук подорожей",
      inviteFriends: "Запросити друзів",
      invite: "Запросити",
      expensesOverview: "Огдяд витрат",
      expenseDescription: "Опис витрати",
      youPaid: "Ви заплатили",
      itCostsYou: "Це коштує вам",
      totalTripCost: "Загальні витрати",
      ShareThisLinkToInviteOthersToThisTrip: "Поділитися посиланням на подорож",
      YouAreAParticipant: "Ви учасник",
      View: "Дивитися",
      createTripTitle: "Куди далі?",
      tripName: "Назва подорожі",
      destination: "Місце призначення",
      enterTripName: "Введіть назву подорожі",
      enterDestination: "Введіть місце призначення",
      startDate: "Дата початку",
      endDate: "Дата завершення",
      description: "Опис",
      enterDescription: "Введіть опис",
      tripCreated: "Подорож успішно створена!",
      endDateError: "Дата завершення не може бути раніше дати початку.",
      locationNotFound: "Місце не знайдено",
      createTripError: "Не вдалося створити подорож.",
      currentWeather: "Поточна погода",
      temperature: "Температура",
      windSpeed: "Вітер",
      openInMaps: "Відкрити на карті",
      noWeatherData: "Немає доступних даних про погоду",
      loadingWeatherData: "Завантаження даних про погоду...",
      failedToLoadWeather: "Не вдалося завантажити дані про погоду",
      theCrew: "Команда",
      youAreTheOwnerOfTheTrip: "Ви є власником подорожі",
      youAreAnAdminOfTheTrip: "Ви є адміністратором",
      tripDurationDay: "день",
      tripDurationDays: "днів",
      thePlace: "Місце",
      discoverAmazingTrip: "Відкрийте для себе неймовірну подорож до",
      timeline: "Хронологія",
      toAddActivity: "Щоб додати подію, ви повинні бути власником подорожі.",
      dayPlan: "План дня",
      noActivities: "Подій на цей день не заплановано.",
      addActivity: "Додати подію",
      showMore: "Показати більше",
      showLess: "Показати менше",
      editActivity: "Редагувати подію",
      activityName: "Назва події",
      activityDescription: "Опис події",
      activityTime: "Час події",
      selectDate: "Оберіть дату",
      updateActivity: "Оновити подію",
      enterActivityName: "Введіть назву події",
      next: "Далі",
      enterActivityDescription: "Введіть опис події",
      enterActivityTime: "Введіть час події",
      settlementSummary: "Розрахунки",
      settlementDescription: "Кожен рядок показує боржника (того, хто винен гроші), кредитора (того, кому потрібно платити), та суму боргу.",
      debtor: "Боржник",
      creditor: "Кредитор",
      amount: "Сума",
      noSettlements: "Немає розрахунків для відображення",
      edit: "Редагувати",
      delete: "Видалити",
      save: "Зберегти",
      cancel: "Відмінити",
      expensesLog: "Історія витрат",
      history: "Історія",
      responsible: "Відповідальний",
      whoPays: "Хто платить",
      involved: "Учасники",
      addExpense: "Додати витрату",
      settings: "Налаштування",
      login: "Увійти",
      name: "Ім'я",
      register: "Зареєструватися",
      logout: "Вийти",
      rememberMe: "Запам'ятати мене",
      forgotPassword: "Забули пароль?",
      email: "Електронна пошта",
      password: "Пароль",
      dontHaveAnAccount: "Немає облікового запису?",
      alreadyHaveAnAccount: "Вже маєте обліковий запис?",
      editTrip: "Змінити подорож",
      editExpense: "Змінити витрату",
      expenseName: "Назва витрати",
      specificSplit: "Розділити інакше",
      splitAmong: "Розділити між",
      goBack: "Назад",
      bookingLink: "Посилання на бронювання",
      whyChooseTripper: "Чому обрати Tripper?",
      organizedItineraries: "Організовані маршрути",
      organizedItinerariesDescription: "Плануйте ваші подорожі з легкістю, створюючи організовані маршрути. Додавайте місця призначення, проживання та активності, щоб все було під контролем.",
      expenseSplitting: "Розподіл витрат",
      expenseSplittingDescription: "Автоматично розподіляйте витрати між учасниками. Ви можете встановити спеціальні методи розподілу або розділити витрати рівномірно, забезпечуючи справедливий досвід.",
      realTimeSettlements: "Реальний час розрахунків",
      realTimeSettlementsDescription: "Відстежуйте, хто кому і скільки винен в режимі реального часу. Наша автоматизована система розрахунків забезпечує справедливий розподіл витрат протягом і після подорожі.",
      simplifyGroupTravel: "Спрощуйте групові подорожі з Tripper",
      simplifyGroupTravelDescription: "Tripper допомагає планувати, відстежувати витрати та ділити витрати без зусиль для групових подорожей. Незалежно від того, чи це вихідні або ділова поїздка, ми гарантуємо, що все буде організовано і справедливо.",
      planYourTrip: "Заплануйте подорож",
      shareWithFriends: "Поділіться з друзями",
      settle: "Сплатити",
      settled: "Сплачено",
      expenses: "Витрати",
      settleDebt: "Сплатити борг",
      settlementType: "Варіант оплати",
      cash: "Готівка",
      loginError: "Сталася помилка під час входу. Будь ласка, спробуйте ще раз.",
      signInError: "Сталася помилка під час реєстрації.",
      remainingOwedToYou: "Борги вам",
      pageNotFound: "Сторінку не знайдено",
      goBackHome: "Повернутися на головну",
      reportBug: "Якщо ви знайшли помилку, будь ласка, повідомте про це",
      testMode: "Цей додаток у тестовому режимі",
      viewBooking: "Переглянути бронювання",
      faq: {
        title: "Поширені питання",
        generalQuestions: {
          title: "Загальні питання",
          q1: "Що це за платформа?",
          a1: "Ця платформа допомагає легко розподілити витрати...",
          q2: "Як створити нову подорож?",
          a2: "Щоб створити нову подорож, натисніть на кнопку 'Створити подорож'...",
          q3: "Чи можу я запросити інших приєднатися до моєї подорожі?",
          a3: "Так! Ви можете згенерувати унікальне посилання для кожної подорожі..."
        },
        expensesAndSettlements: {
          title: "Витрати та розрахунки",
          q1: "Як додати витрату?",
          a1: "У кожній подорожі є кнопка 'Додати витрату'...",
          q2: "Як розподіляється витрата серед учасників?",
          a2: "Коли ви додаєте витрату, можна обрати рівномірний поділ...",
          q3: "Що означає 'розрахувати витрату'?",
          a3: "Розрахунок витрати означає запис, що учасник сплатив борг..."
        },
        paymentsAndFairShare: {
          title: "Платежі та справедливий розподіл",
          q1: "Що таке 'справедливий розподіл'?",
          a1: "Справедливий розподіл - це сума, яку кожен учасник повинен сплатити...",
          q2: "Чи можна переглянути історію розрахунків?",
          a2: "Так, розрахунки зберігаються в системі для відстеження...",
          q3: "Як відзначити витрату як сплачену?",
          a3: "У розділі розрахунків натисніть на певний борг..."
        },
        accountAndPrivacy: {
          title: "Обліковий запис та конфіденційність",
          q1: "Чи є мої дані приватними?",
          a1: "Так, ми дбаємо про конфіденційність...",
          q2: "Чи можу я видалити свій обліковий запис?",
          a2: "Так, ви можете видалити обліковий запис у налаштуваннях...",
          q3: "Чи можу я видалити учасників з подорожі?",
          a3: "Тільки власник подорожі може видалити учасників..."
        },
        technicalSupport: {
          title: "Технічна підтримка",
          q1: "Що робити, якщо я виявив помилку?",
          a1: "Повідомте про помилку, звернувшись до служби підтримки...",
          q2: "Як скинути пароль?",
          a2: "Перейдіть на сторінку входу та натисніть 'Забули пароль?'...",
          q3: "Чи є мобільна версія цього додатка?",
          a3: "Наш додаток повністю адаптований для мобільних пристроїв..."
        }
      }
    },
  },
  pl: {
    translation: {
      "resetPassword": "Zresetuj hasło",
      "newPassword": "Nowe hasło",
      "resetPasswordError": "Wystąpił błąd podczas resetowania hasła. Spróbuj ponownie.",
      "forgotPasswordError": "Wystąpił błąd podczas próby zresetowania hasła. Spróbuj ponownie.",
      upcomingTrips: "Nadchodzące podróże",
      pastTrips: "Minione podróże",
      noUpcomingTrips: "Brak nadchodzących podróży.",
      noPastTrips: "Brak minionych podróży.",
      next: "Dalej",
      currencyConfirmationTitle: "Potwierdź walutę",
      othersOwe: "Ile otrzymasz",
      currencyConfirmationMessage: "Czy chcesz kontynuować, czy zmienić walutę? Obecna waluta to: ",
      uploadConfirmation: "Dodaj potwierdzenie",
      welcomeToTripper: "WITAJ W TRIPPER",
      discoverAndPlan: "Odkryj i zaplanuj idealną podróż z Tripper! Zorganizuj swoje przygody z przyjaciółmi i rodziną, dziel koszty i twórz wspomnienia na całe życie.",
      createTrip: "Utwórz Podróż",
      explore: "Eksploruj",
      loading: "Ładowanie...",
      myTrips: "Moje Podróże",
      noTrips: "Nie jesteś uczestnikiem żadnej podróży.",
      home: "Strona główna",
      searchTrips: "Szukaj Podróży",
      YouAreAParticipant: "Jesteś uczestnikiem",
      View: "Zobacz",
      createTripTitle: "Dokąd teraz?",
      tripName: "Nazwa Podróży",
      destination: "Cel Podróży",
      enterTripName: "Wprowadź nazwę podróży",
      enterDestination: "Wprowadź cel podróży",
      startDate: "Data Rozpoczęcia",
      endDate: "Data Zakończenia",
      description: "Opis",
      enterDescription: "Wprowadź opis",
      tripCreated: "Podróż utworzona pomyślnie!",
      endDateError: "Data zakończenia nie może być przed datą rozpoczęcia.",
      locationNotFound: "Lokalizacja nie znaleziona",
      createTripError: "Nie udało się utworzyć podróży.",
      currentWeather: "Aktualna Pogoda",
      temperature: "Temperatura",
      windSpeed: "Wiatr",
      openInMaps: "Otwórz w Mapach",
      noWeatherData: "Brak dostępnych danych pogodowych",
      loadingWeatherData: "Ładowanie danych pogodowych...",
      failedToLoadWeather: "Nie udało się załadować danych pogodowych",
      theCrew: "Załoga",
      name: "Imię",
      youAreTheOwnerOfTheTrip: "Jesteś właścicielem podróży",
      youAreAnAdminOfTheTrip: "Jesteś admin",
      tripDurationDay: "dzień",
      tripDurationDays: "dni",
      thePlace: "Miejsce",
      discoverAmazingTrip: "Odkryj niesamowitą podróż do",
      timeline: "Oś Czasu",
      toAddActivity: "Aby dodać aktywność, musisz być właścicielem podróży.",
      dayPlan: "plan dnia",
      noActivities: "Brak zaplanowanych aktywności na ten dzień.",
      addActivity: "Dodaj Aktywność",
      showMore: "Pokaż Więcej",
      showLess: "Pokaż Mniej",
      editActivity: "Edytuj Aktywność",
      activityName: "Nazwa Aktywności",
      activityDescription: "Opis Aktywności",
      activityTime: "Czas Aktywności",
      selectDate: "Wybierz Datę",
      updateActivity: "Zaktualizuj Aktywność",
      enterActivityName: "Wprowadź nazwę aktywności",
      enterActivityDescription: "Wprowadź opis aktywności",
      enterActivityTime: "Wprowadź czas aktywności",
      settlementSummary: "Podsumowanie",
      settlementDescription: "Każdy wiersz pokazuje dłużnika (osobę, która jest winna pieniądze), wierzyciela (osobę, której należy zapłacić) oraz kwotę należną.",
      debtor: "Dłużnik",
      creditor: "Wierzyciel",
      amount: "Kwota",
      noSettlements: "Brak rozliczeń do wyświetlenia",
      edit: "Edytuj",
      delete: "Usuń",
      save: "Zapisz",
      cancel: "Anuluj",
      expensesLog: "Rejestr Wydatków",
      history: "Historia",
      responsible: "Odpowiedzialny",
      whoPays: "Kto płaci",
      involved: "Zaangażowani",
      addExpense: "Dodaj Wydatek",
      pleaseEnterValidAmount: "Wprowadź prawidłową kwotę",
      failedToAddExpense: "Nie udało się dodać wydatku",
      addingExpense: "Dodawanie Wydatku...",
      expenseName: "Nazwa Wydatku",
      expenseDescription: "Opis Wydatku",
      specificSplit: "Szczegółowy podział",
      splitAmong: "Podziel między",
      expenseFormInstructions: "Aby dodać wydatek, wypełnij nazwę wydatku, kwotę i wybierz odpowiedzialnego uczestnika. Wybierz metodę podziału (równo lub szczegółowo) i przypisz uczestników, jeśli to konieczne.",
      expensesOverview: "Przegląd Wydatków",
      youPaid: "Ty zapłaciłeś",
      totalTripCost: "Koszt podróży",
      itCostsYou: "Kosztuje dla ciebie",
      inviteFriends: "Zaproś znajomych",
      invite: "Zaproś",
      ShareThisLinkToInviteOthersToThisTrip: "Udostępnij ten link, aby zaprosić innych do tej podróży.",
      editTrip: "Edytuj podróż",
      goBack: "Wróć",
      planYourTrip: "Zaplanuj Swoją Podróż",
      shareWithFriends: "Podziel się z przyjaciółmi",
      settings: "Ustawienia",
      login: "Zaloguj się",
      register: "Zarejestruj się",
      logout: "Wyloguj się",
      rememberMe: "Zapamiętaj mnie",
      forgotPassword: "Zapomniałeś hasła?",
      email: "Email",
      password: "Hasło",
      dontHaveAnAccount: "Nie masz konta?",
      alreadyHaveAnAccount: "Masz już konto?",
      whyChooseTripper: "Dlaczego wybrać Tripper?",
      organizedItineraries: "Zorganizowane planowanie podróży",
      organizedItinerariesDescription: "Planowanie podróży bez wysiłku dzięki zorganizowanemu harmonogramowi. Dodawaj cele podróży, zakwaterowanie i aktywności, aby wszystko było pod kontrolą.",
      expenseSplitting: "Podział wydatków",
      expenseSplittingDescription: "Automatycznie podziel wydatki pomiędzy uczestników. Możesz ustawić niestandardowe metody podziału lub podzielić koszty równomiernie, zapewniając uczciwe doświadczenie.",
      realTimeSettlements: "Rozliczenia w czasie rzeczywistym",
      realTimeSettlementsDescription: "Śledź, kto jest komu i ile winien w czasie rzeczywistym. Nasz zautomatyzowany system rozliczeń zapewnia, że każdy zapłaci swoją część zarówno w trakcie, jak i po zakończeniu podróży.",
      simplifyGroupTravel: "Uprość podróże grupowe z Tripper",
      simplifyGroupTravelDescription: "Tripper pomaga planować, śledzić wydatki i dzielić koszty bez wysiłku podczas podróży grupowych. Niezależnie od tego, czy to weekendowy wypad, czy podróż służbowa, dbamy o to, by wszystko było zorganizowane i sprawiedliwe.",
      expenses: "Wydatki",
      settle: "Zapłać",
      settled: "Zapłacony",
      settleDebt: "Uregulowaj dług",
      settlementType: "Opcja płatności",
      cash: "Gotówka",
      loginError: "Wystąpił błąd podczas logowania. Proszę spróbuj ponownie.",
      signInError: "Wystąpił błąd podczas rejestracji.",
      remainingOwedToYou: "dług tobie",
      pageNotFound: "Strona nie znaleziona",
      goBackHome: "Wróć do strony głównej",
      reportBug: "Jeśli znalazłeś błąd, proszę zgłoś go",
      testMode: "Ta aplikacja jest w trybie testowym",
      viewBooking: "Pokaż rezerwacji",
      bookingLink: "Link do rezerwacji",
      faq: {
        title: "Najczęściej zadawane pytania",
        generalQuestions: {
          title: "Ogólne pytania",
          q1: "O co chodzi w tej platformie?",
          a1: "Platforma ułatwia rozliczanie wspólnych wydatków i rozrachunków, dzięki czemu organizowanie podróży w grupie staje się łatwiejsze.",
          q2: "Jak utworzyć nową podróż?",
          a2: "Aby utworzyć nową podróż, kliknij „Utwórz podróż” na swojej stronie głównej.",
          q3: "Czy mogę zaprosić innych do dołączenia do mojej podróży?",
          a3: "Tak! Możesz wygenerować unikalny link do dołączenia dla każdej podróży."
        },
        expensesAndSettlements: {
          title: "Wydatki i rozliczenia",
          q1: "Jak dodać wydatek?",
          a1: "W każdej podróży znajdziesz przycisk „Dodaj wydatek”. Kliknij, wprowadź szczegóły wydatku, a następnie zatwierdź.",
          q2: "Jak dzielony jest wydatek między uczestników?",
          a2: "Podczas dodawania wydatku możesz wybrać podział równy lub niestandardowy, dostosowany do potrzeb.",
          q3: "Co oznacza „rozliczenie wydatku”?",
          a3: "Rozliczenie wydatku oznacza, że dany uczestnik spłacił swój udział w koszcie."
        },
        paymentsAndFairShare: {
          title: "Płatności i sprawiedliwy podział",
          q1: "Co to jest „Sprawiedliwy Podział”?",
          a1: "Sprawiedliwy Podział to suma, którą każdy uczestnik powinien zapłacić, aby podzielić koszty podróży równomiernie.",
          q2: "Czy mogę zobaczyć historię spłaconych długów?",
          a2: "Tak, system przechowuje historię spłaconych długów, którą można przejrzeć w dowolnym momencie.",
          q3: "Jak oznaczyć wydatek jako rozliczony?",
          a3: "W sekcji rozliczeń kliknij na dany dług, aby oznaczyć go jako rozliczony."
        },
        accountAndPrivacy: {
          title: "Konto i prywatność",
          q1: "Czy moje dane są prywatne?",
          a1: "Tak, dbamy o prywatność użytkowników i chronimy Twoje dane.",
          q2: "Czy mogę usunąć swoje konto?",
          a2: "Tak, możesz usunąć swoje konto w ustawieniach konta.",
          q3: "Czy mogę usunąć uczestników z podróży?",
          a3: "Tylko właściciel podróży może usuwać uczestników."
        },
        technicalSupport: {
          title: "Wsparcie techniczne",
          q1: "Co zrobić, jeśli napotkam błąd?",
          a1: "Zgłoś błąd, kontaktując się z pomocą techniczną.",
          q2: "Jak zresetować hasło?",
          a2: "Przejdź na stronę logowania i kliknij „Zapomniałeś hasła?”.",
          q3: "Czy istnieje wersja mobilna tej aplikacji?",
          a3: "Nasza aplikacja jest w pełni responsywna i dostępna na urządzeniach mobilnych."
        }
      }

    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
