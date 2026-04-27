import { transformForSubmit as platformTransformForSubmit } from 'platform/forms-system/src/js/helpers';

const stripHyphens = ssn => (ssn ? ssn.replace(/-/g, '') : ssn);

const parseCurrency = value => {
  if (value === null || value === undefined || value === '') return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
};

export const transform = (formConfig, form) => {
  const {
    veteranFullName,
    veteranSocialSecurityNumber,
    hasCurrentInsurance,
    insuranceCardUploads,
    medicareCardUpload,
    medicaidCardUpload,
    maritalStatus,
    spouseFullName,
    spouseSocialSecurityNumber,
    spouseDateOfBirth,
    dateOfMarriage,
    dateOfLegalSeparationOrDivorce,
    dateOfSpouseDeath,
    dependents,
    financialDisclosureElection,
    careType,
    veteranPrimaryResidence,
    spousePrimaryResidence,
    veteranOtherResidences,
    spouseOtherResidences,
    veteranVehicles,
    spouseVehicles,
    veteranCashAndInvestments,
    spouseCashAndInvestments,
    veteranOtherLiquidAssets,
    spouseOtherLiquidAssets,
    veteranHouseholdEffects,
    spouseHouseholdEffects,
    veteranEmploymentIncome,
    veteranEmploymentIncomeFrequency,
    veteranBusinessIncome,
    veteranBusinessIncomeFrequency,
    veteranOtherIncome,
    veteranOtherIncomeFrequency,
    spouseEmploymentIncome,
    spouseEmploymentIncomeFrequency,
    spouseBusinessIncome,
    spouseBusinessIncomeFrequency,
    spouseOtherIncome,
    spouseOtherIncomeFrequency,
    educationalExpenses,
    funeralBurialExpenses,
    rentMortgageAmount,
    rentMortgageFrequency,
    utilities,
    carPayment,
    food,
    nonReimbursedMedical,
    courtOrderedPayments,
    insurancePremiums,
    taxesPaid,
    submitterType,
    poaDocumentUpload,
  } = form.data;

  const isInstitutional =
    careType === 'institutional' && financialDisclosureElection === 'yes';
  const hasSpouse = [
    'married_living_with',
    'married_separate_not_institutionalized',
    'married_separate_institutionalized',
  ].includes(maritalStatus);
  const isLegallySeparatedOrDivorced =
    maritalStatus === 'divorced_separated_widowed_this_year';
  const includeSpouseFinancials =
    hasSpouse && !isLegallySeparatedOrDivorced;

  const now = new Date().toISOString();

  const payload = {
    form_data: {
      section_i: {
        veteran_full_name: {
          first: veteranFullName?.first || '',
          middle: veteranFullName?.middle || null,
          last: veteranFullName?.last || '',
        },
        veteran_ssn: stripHyphens(veteranSocialSecurityNumber),
      },
      section_ii: {
        has_current_insurance: hasCurrentInsurance === true,
        insurance_document_guids: (insuranceCardUploads || [])
          .map(f => f?.guid)
          .filter(Boolean),
        medicare_document_guid: medicareCardUpload?.guid || null,
        medicaid_document_guid: medicaidCardUpload?.guid || null,
      },
      section_iii: {
        marital_status: maritalStatus,
        spouse: hasSpouse || isLegallySeparatedOrDivorced
          ? {
              full_name: spouseFullName
                ? {
                    first: spouseFullName.first || '',
                    middle: spouseFullName.middle || null,
                    last: spouseFullName.last || '',
                  }
                : null,
              ssn: stripHyphens(spouseSocialSecurityNumber),
              date_of_birth: spouseDateOfBirth || null,
              date_of_marriage: dateOfMarriage || null,
              date_of_legal_separation_or_divorce:
                dateOfLegalSeparationOrDivorce || null,
              date_of_death: dateOfSpouseDeath || null,
            }
          : null,
        dependents: (dependents || []).map(dep => ({
          full_name: {
            first: dep.dependentFullName?.first || '',
            middle: dep.dependentFullName?.middle || null,
            last: dep.dependentFullName?.last || '',
          },
          ssn: stripHyphens(dep.dependentSocialSecurityNumber),
          date_of_birth: dep.dependentDateOfBirth || null,
        })),
      },
      section_iv: {
        financial_disclosure_election: financialDisclosureElection,
      },
      section_v: isInstitutional
        ? {
            applicable: true,
            veteran: {
              primary_residence: parseCurrency(veteranPrimaryResidence),
              other_residences: parseCurrency(veteranOtherResidences),
              vehicles: parseCurrency(veteranVehicles),
            },
            spouse: includeSpouseFinancials
              ? {
                  primary_residence: parseCurrency(spousePrimaryResidence),
                  other_residences: parseCurrency(spouseOtherResidences),
                  vehicles: parseCurrency(spouseVehicles),
                }
              : null,
          }
        : { applicable: false },
      section_vi: isInstitutional
        ? {
            applicable: true,
            veteran: {
              cash_and_investments: parseCurrency(veteranCashAndInvestments),
              other_liquid_assets: parseCurrency(veteranOtherLiquidAssets),
              household_effects: parseCurrency(veteranHouseholdEffects),
            },
            spouse: includeSpouseFinancials
              ? {
                  cash_and_investments: parseCurrency(spouseCashAndInvestments),
                  other_liquid_assets: parseCurrency(spouseOtherLiquidAssets),
                  household_effects: parseCurrency(spouseHouseholdEffects),
                }
              : null,
          }
        : { applicable: false },
      section_vii:
        financialDisclosureElection === 'yes'
          ? {
              veteran: {
                employment_income: {
                  amount: parseCurrency(veteranEmploymentIncome),
                  frequency: veteranEmploymentIncomeFrequency || null,
                },
                business_income: {
                  amount: parseCurrency(veteranBusinessIncome),
                  frequency: veteranBusinessIncomeFrequency || null,
                },
                other_income: {
                  amount: parseCurrency(veteranOtherIncome),
                  frequency: veteranOtherIncomeFrequency || null,
                },
              },
              spouse: includeSpouseFinancials
                ? {
                    employment_income: {
                      amount: parseCurrency(spouseEmploymentIncome),
                      frequency: spouseEmploymentIncomeFrequency || null,
                    },
                    business_income: {
                      amount: parseCurrency(spouseBusinessIncome),
                      frequency: spouseBusinessIncomeFrequency || null,
                    },
                    other_income: {
                      amount: parseCurrency(spouseOtherIncome),
                      frequency: spouseOtherIncomeFrequency || null,
                    },
                  }
                : null,
            }
          : null,
      section_viii:
        financialDisclosureElection === 'yes'
          ? {
              educational_expenses: parseCurrency(educationalExpenses),
              funeral_burial_expenses: parseCurrency(funeralBurialExpenses),
              rent_mortgage: {
                amount: parseCurrency(rentMortgageAmount),
                frequency: rentMortgageFrequency || null,
              },
              utilities: parseCurrency(utilities),
              car_payment: parseCurrency(carPayment),
              food: parseCurrency(food),
              non_reimbursed_medical: parseCurrency(nonReimbursedMedical),
              court_ordered_payments: parseCurrency(courtOrderedPayments),
              insurance_premiums: parseCurrency(insurancePremiums),
              taxes_paid: parseCurrency(taxesPaid),
            }
          : null,
      section_ix_xi_attestation: {
        attested: true,
        attestation_timestamp: now,
        attested_by: submitterType === 'poa_representative'
          ? 'poa_representative'
          : 'veteran',
      },
      poa: {
        is_poa_submission: submitterType === 'poa_representative',
        poa_document_guid: poaDocumentUpload?.guid || null,
      },
      care_type: careType || null,
      submission_metadata: {
        form_version: 'MAY 2025',
        omg_control_number: '2900-0629',
        submission_source: 'va.gov_digital',
      },
    },
  };

  return JSON.stringify(payload);
};

export default transform;