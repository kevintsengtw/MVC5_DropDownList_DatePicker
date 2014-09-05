using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DropDiwnList_DatePicker.Infrastructure
{
    public class AgeRangeAttribute : ValidationAttribute, IClientValidatable
    {
        public int MinAge { get; set; }
        public int MaxAge { get; set; }

        protected override ValidationResult IsValid(
            object value,
            ValidationContext validationContext)
        {
            //THIS IS FOR SERVER SIDE VALIDATION

            // if value not supplied then no error return
            if (value == null)
            {
                return null;
            }

            int age = 0;
            age = DateTime.Now.Year - Convert.ToDateTime(value).Year;
            if (age >= MinAge && age <= MaxAge)
            {
                return null; // Validation success
            }
            else
            {
                return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
                // error 
            }
        }

        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(
            ModelMetadata metadata,
            ControllerContext context)
        {
            //THIS IS FOR SET VALIDATION RULES CLIENT SIDE

            var rule = new ModelClientValidationRule()
            {
                ValidationType = "agerangevalidation",
                ErrorMessage = FormatErrorMessage(metadata.DisplayName)
            };

            rule.ValidationParameters["minage"] = MinAge;
            rule.ValidationParameters["maxage"] = MaxAge;
            yield return rule;
        }
    }

}