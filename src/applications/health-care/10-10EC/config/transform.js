const transformForSubmit = (formConfig, form) => {
  const { data } = form;

  const stripHyphens = ssn => (ssn ? ssn.replace(/-/g, '') : null);

  const parseCurrency = val => {
    if (val === null || val === undefined || val === '') return null;
    const parsed = parseFloat(val);
    return Number.isNaN(parsed) ? null : Math.round(parsed * 100) / 100;
  };

  const formatDate = dateStr => dateStr || null;

  const buildIncomeEntry = (amount, frequency) => ({
    amount: parseCurrency(amount),
    frequency: amount && parseFloat(amount) > 0 ? frequency || null : null,
  });

  const MARRIED_STATUSES = [
    'married_living_with',
    'married_separate_not_institutionalized',
    'married_separate_institutionalized',
  ];

  const hasLivingSpouse = MARRIED_STATUSES.includes(data.maritalStatus);
  const isInstitutional = data.careType === 'institutional';
  const disclosureYes = data.financialDisclosureElection === 'yes';

  const spouseData =
    hasLivingSpouse && data.spouseFullName
      ? {
          fullName: data.spouseFullName,
          ssn: stripHyphens(data.spouseSsn),
          dateOfBirth: formatDate(data.spouseDateOfBirth),
          dateOfMarriage: formatDate(data.dateOfMarriage),
          dateOfLegalSeparationOrDivorce: formatDate(
            data.dateOfLegalSeparationOrDivorce,
          ),
          dateOfDeath: formatDate(data.dateOfSpouseDeath),
        }
      : null;

  const dependentsData = (data.dependents || []).map(dep => ({
    fullName: dep.fullName,
    ssn: stripHyphens(dep.ssn),
    dateOfBirth: formatDate(dep.dateOfBirth),
  }));

  const sectionV =
    disclosureYes && isInstitutional
      ? {
          applicable: true,
          veteran: {
            primaryResidence: parseCurrency(
              data.fixedAssetsVeteranPrimaryResidence,
            ),
            otherResidences: parseCurrency(
              data.fixedAssetsVeteranOtherResidences,
            ),
            vehicles: parseCurrency(data.fixedAssetsVeteranVehicles),
          },
          spouse: hasLivingSpouse
            ? {
                primaryResidence: parseCurrency(
                  data.fixedAssetsSpousePrimaryResidence,
                ),
                otherResidences: parseCurrency(
                  data.fixedAssetsSpouseOtherResidences,
                ),
                vehicles: parseCurrency(data.fixedAssetsSpouseVehicles),
              }
            : null,
        }
      : { applicable: false };

  const sectionVI =
    disclosureYes && isInstitutional
      ? {
          applicable: true,
          veteran: {
            cashAndInvestments: parseCurrency(
              data.liquidAssetsVeteranCashAndInvestments,
            ),
            otherLiquidAssets: parseCurrency(
              data.liquidAssetsVeteranOtherLiquidAssets,
            ),
            householdEffects: parseCurrency(
              data.liquidAssetsVeteranHouseholdEffects,
            ),
          },
          spouse: hasLivingSpouse
            ? {
                cashAndInvestments: parseCurrency(
                  data.liquidAssetsSpouseCashAndInvestments,
                ),
                otherLiquidAssets: parseCurrency(
                  data.liquidAssetsSpouseOtherLiquidAssets,
                ),
                householdEffects: parseCurrency(
                  data.liquidAssetsSpouseHouseholdEffects,
                ),
              }
            : null,
        }
      : { applicable: false };

  const sectionVII = disclosureYes
    ? {
        veteran: {
          employmentIncome: buildIncomeEntry(
            data.employmentIncomeVeteran,
            data.employmentIncomeFrequencyVeteran,
          ),
          businessIncome: buildIncomeEntry(
            data.businessIncomeVeteran,
            data.businessIncomeFrequencyVeteran,
          ),
          otherIncome: buildIncomeEntry(
            data.otherIncomeVeteran,
            data.otherIncomeFrequencyVeteran,
          ),
        },
        spouse:
          hasLivingSpouse &&
          data.maritalStatus !== 'divorced_separated_widowed_this_year'
            ? {
                employmentIncome: buildIncomeEntry(
                  data.employmentIncomeSpouse,
                  data.employmentIncomeFrequencySpouse,
                ),
                businessIncome: buildIncomeEntry(
                  data.businessIncomeSpouse,
                  data.businessIncomeFrequencySpouse,
                ),
                otherIncome: buildIncomeEntry(
                  data.otherIncomeSpouse,
                  data.otherIncomeFrequencySpouse,
                ),
              }
            : null,
      }
    : null;

  const sectionVIII = disclosureYes
    ? {
        educationalExpenses: parseCurrency(data.educationalExpenses),
        funeralBurialExpenses: parseCurrency(data.funeralBurialExpenses),
        rentMortgage: {
          amount: parseCurrency(data.rentMortgageAmount),
          frequency: data.rentMortgageFrequency || null,
        },
        utilities: parseCurrency(data.utilities),
        carPayment: parseCurrency(data.carPayment),
        food: parseCurrency(data.food),
        nonReimbursedMedical: parseCurrency(data.nonReimbursedMedical),
        courtOrderedPayments: parseCurrency(data.courtOrderedPayments),
        insurancePremiums: parseCurrency(data.insurancePremiums),
        taxesPaid: parseCurrency(data.taxesPaid),
      }
    : null;

  const payload = {
    extendedCareApplication: {
      formData: {
        sectionI: {
          veteranFullName: data.veteranFullName,
          veteranSsn: stripHyphens(data.veteranSsn),
        },
        sectionII: {
          hasCurrentInsurance: data.hasCurrentInsurance,
          insuranceDocumentGuids: data.insuranceDocumentGuids || [],
          medicareDocumentGuid: data.medicareDocumentGuid || null,
          medicaidDocumentGuid: data.medicaidDocumentGuid || null,
        },
        sectionIII: {
          maritalStatus: data.maritalStatus,
          spouse: spouseData,
          dependents: dependentsData,
        },
        sectionIV: {
          financialDisclosureElection: data.financialDisclosureElection,
        },
        careType: data.careType || null,
        sectionV,
        sectionVI,
        sectionVII,
        sectionVIII,
        sectionIXXIAttestation: {
          attested: true,
          attestationTimestamp: new Date().toISOString(),
          attestedBy: data.submitterType === 'poa_representative'
            ? 'poa_representative'
            : 'veteran',
        },
        poa: {
          isPoaSubmission: data.submitterType === 'poa_representative',
          poaDocumentGuid: data.poaDocumentGuid || null,
        },
        submissionMetadata: {
          formVersion: 'MAY 2025',
          ombControlNumber: '2900-0629',
          submissionSource: 'va.gov_digital',
        },
      },
    },
  };

  return JSON.stringify(payload);
};

export default transformForSubmit;