"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRating = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 3] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 2] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 1] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 0] = "CriticalRisk";
})(HealthCheckRating || (exports.HealthCheckRating = HealthCheckRating = {}));
