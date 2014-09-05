using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DropDiwnList_DatePicker.Infrastructure
{
    public class MinAgeAttribute : ValidationAttribute, IClientValidatable
    {
        private readonly int _MinAge;
        public MinAgeAttribute(int minAge)
        {
            _MinAge = minAge;
        }

        protected override ValidationResult IsValid(
            object value,
            ValidationContext validationContext)
        {
            if (value == null)
            {
                return null;
            }

            var birthDate = Convert.ToDateTime(value);

            var age = DateTime.Now.Year - Convert.ToDateTime(value).Year;
            var m = DateTime.Now.Month - birthDate.Month;

            if (m < 0 || (m == 0 && DateTime.Now.Day < birthDate.Day))
            {
                age--;
            }

            return age >= _MinAge
                ? null
                : new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
        }

        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(
            ModelMetadata metadata,
            ControllerContext context)
        {
            var rule = new ModelClientValidationRule()
            {
                ValidationType = "minagevalidation",
                ErrorMessage = FormatErrorMessage(metadata.DisplayName)
            };

            rule.ValidationParameters["minage"] = _MinAge;
            yield return rule;
        }
    }

}